<#
.SYNOPSIS
  Generate every shippable brand asset from the two supplied source images.

.DESCRIPTION
  Two source files, both supplied, both the single source of truth:

    app/assets/logo/logo.png   1376x768  the horizontal lockup - orange mark on the
                                          left, "CREAOVA" wordmark on the right,
                                          a small-caps descriptor line under it.
                                          Flat artwork on a WHITE background, no
                                          alpha channel.
    app/assets/icon/icon.png    358x388  the mark on its own, for the app icons.
                                          Same white background, no alpha.

  Both are painted on opaque white, so the first job of this script is to turn
  that white into a real alpha channel (see ConvertTo-Transparent).

  This script derives:

    public/logo.png             colour lockup    web / header / drawer / email
    public/logo-master.png      colour lockup    print, social, retina
    public/logo-dark.png        ink lockup       one-colour print on white
    public/logo-inverse.png     white lockup     the dark footer panel
    public/favicon.png          orange, clear     64x64   browser tab
    public/apple-touch-icon.png orange on ink    180x180  iOS home screen
    public/icon-192.png         orange on ink    192x192  Android / PWA
    public/icon-512.png         orange on ink    512x512  Android / PWA

  Three decisions worth knowing about:

  - The lockup that ships is the MARK + WORDMARK only. The supplied file also
    carries a small-caps descriptor line under the wordmark; at header size
    (24-32px tall) that line is five pixels high and reads as a smudge, so it is
    left out of the web lockup and the wordmark is centred on the mark instead.
    The descriptor still lives in the artwork, and the site states it as real
    text in the footer and the email signature.

  - The wordmark is part of the IMAGE, never live DOM text. The supplied
    wordmark is a bold geometric sans; the site sets its headings in Fraunces,
    a serif. Setting the same word as live text would put two different brands
    side by side - and two "CREAOVA"s on the screen - so the word stays in the
    artwork and the brand name is announced by the link label instead.

  - The favicon is the ORANGE mark on a CLEAR background; the device icons put
    the mark on the ink canvas. A favicon is drawn on whatever colour the tab
    bar happens to be, so a dark tile behind it reads as a black box stuck onto
    the tab strip. The device icons are the opposite case: iOS composites a
    transparent apple-touch-icon onto black, and the mark is flat #FE7002, which
    is 7.2:1 against #16130f but only 2.8:1 against white - a colour mark on a
    white icon tile disappears on a light home screen.

  - Everything is scaled while it is still OPAQUE and the white is only turned
    into alpha at the very end. Resampling a transparent bitmap makes GDI+
    blend the transparent neighbours into the artwork, which eats the thin
    strokes of the wordmark and fills in the hole in the key.

  Scaling is done by successive halvings down to within 2x of the target and
  then one final bicubic step. A single 10:1 reduction aliases badly; halving
  does not.

.EXAMPLE
  powershell -NoProfile -ExecutionPolicy Bypass -File scripts/prepare-logo.ps1
#>
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

# System.Drawing is used for all raster work; the assembly must be loaded before
# any [System.Drawing.*] type is referenced.
Add-Type -AssemblyName System.Drawing

$Root      = Split-Path -Parent $PSScriptRoot
$PublicDir = Join-Path $Root 'public'
$LogoSrc   = Join-Path $Root 'app\assets\logo\logo.png'
$IconSrc   = Join-Path $Root 'app\assets\icon\icon.png'

foreach ($path in @($LogoSrc, $IconSrc)) {
    if (-not (Test-Path $path)) { throw "Source artwork not found: $path" }
}
if (-not (Test-Path $PublicDir)) { New-Item -ItemType Directory -Path $PublicDir -Force | Out-Null }

$InkR = [byte]0x16; $InkG = [byte]0x13; $InkB = [byte]0x0f   # --color-ink
$WhR  = [byte]0xff; $WhG  = [byte]0xff; $WhB  = [byte]0xff

# Height of the web lockup, in pixels. The lockup is displayed at 24-32 CSS px,
# so this is roughly 3x the largest display size - crisp on retina without
# carrying a silly file around.
$WebHeight = 96
$MasterHeight = 192

# A pixel counts as artwork when its darkest channel is below this. White is
# 255, so anything under it is at least 20% covered by ink.
$InkCut = 200

# ── helpers ────────────────────────────────────────────────────────────────

# Read an image into a BGRA byte array (the in-memory layout of a 32bpp
# bitmap). The byte array is returned as ONE object - PowerShell unrolls
# arrays on output, so the comma is required.
function Get-PixelBytes {
    param([System.Drawing.Image]$Image)

    $w = $Image.Width; $h = $Image.Height
    $bmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $gfx = [System.Drawing.Graphics]::FromImage($bmp)
    $gfx.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $gfx.DrawImage($Image, 0, 0, $w, $h)
    $gfx.Dispose()

    $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
    $data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $bytes = New-Object byte[] ($data.Stride * $h)
    [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
    $bmp.UnlockBits($data)
    $bmp.Dispose()

    return ,$bytes
}

# Build a 32bpp bitmap from a BGRA byte array.
function New-BitmapFromBytes {
    param([byte[]]$Bytes, [int]$Width, [int]$Height)

    $bmp = New-Object System.Drawing.Bitmap $Width, $Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $rect = New-Object System.Drawing.Rectangle 0, 0, $Width, $Height
    $data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    [System.Runtime.InteropServices.Marshal]::Copy($Bytes, 0, $data.Scan0, $Bytes.Length)
    $bmp.UnlockBits($data)

    return $bmp
}

# Turn an opaque white matte into a real alpha channel.
#
# The artwork is flat colour painted on white, so a pixel is a blend of the
# artwork colour C over white:
#
#     observed = a * C + (1 - a) * 255
#
# The darkest channel is the one that reaches white last, so it gives the
# coverage:  a = 255 - min(r, g, b).  The artwork colour then falls out of the
# same equation:  C = (observed - min) * 255 / (255 - min).
#
# Both steps together round-trip exactly for a flat region: the navy #131B26
# comes back as #000915 at 92.5% coverage, which composites to #131B26 again on
# any near-white surface.
function ConvertTo-Transparent {
    param([System.Drawing.Image]$Image)

    $w = $Image.Width; $h = $Image.Height
    $bytes = Get-PixelBytes -Image $Image

    for ($i = 0; $i -lt $bytes.Length; $i += 4) {
        $b = $bytes[$i]; $g = $bytes[$i + 1]; $r = $bytes[$i + 2]
        $mn = [math]::Min($r, [math]::Min($g, $b))
        $a = 255 - $mn

        if ($a -lt 6) {
            # Background, or background noise from the export. Fully clear it so
            # the flat panels around the artwork do not carry a grey haze.
            $bytes[$i] = 0; $bytes[$i + 1] = 0; $bytes[$i + 2] = 0; $bytes[$i + 3] = 0
            continue
        }

        $k = 255.0 / $a
        $bytes[$i]     = [byte][math]::Min(255, [math]::Round(($b - $mn) * $k))
        $bytes[$i + 1] = [byte][math]::Min(255, [math]::Round(($g - $mn) * $k))
        $bytes[$i + 2] = [byte][math]::Min(255, [math]::Round(($r - $mn) * $k))
        $bytes[$i + 3] = [byte]$a
    }

    $out = New-BitmapFromBytes -Bytes $bytes -Width $w -Height $h
    $bytes = $null
    return $out
}

# Ink profile of an OPAQUE image: how many artwork pixels each column and each
# row holds. A pixel is artwork when its darkest channel is below $Cut.
function Get-MatteProfile {
    param([byte[]]$Bytes, [int]$Width, [int]$Height, [int]$Cut = 200)

    $cols = New-Object int[] $Width
    $rows = New-Object int[] $Height

    for ($y = 0; $y -lt $Height; $y++) {
        $rowOff = $y * $Width * 4
        for ($x = 0; $x -lt $Width; $x++) {
            $i = $rowOff + $x * 4
            $mn = [math]::Min($Bytes[$i + 2], [math]::Min($Bytes[$i + 1], $Bytes[$i]))
            if ($mn -lt $Cut) {
                $cols[$x]++
                $rows[$y]++
            }
        }
    }

    return @{ Cols = $cols; Rows = $rows }
}

# Bounding box of the artwork pixels inside a window.
function Get-MatteBox {
    param([byte[]]$Bytes, [int]$Width, [int]$Height, [int]$X0, [int]$X1, [int]$Y0, [int]$Y1, [int]$Cut = 200)

    $minX = $Width; $maxX = -1; $minY = $Height; $maxY = -1
    for ($y = $Y0; $y -le $Y1; $y++) {
        $rowOff = $y * $Width * 4
        for ($x = $X0; $x -le $X1; $x++) {
            $i = $rowOff + $x * 4
            $mn = [math]::Min($Bytes[$i + 2], [math]::Min($Bytes[$i + 1], $Bytes[$i]))
            if ($mn -lt $Cut) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }

    if ($maxX -lt 0) { return $null }
    return @{ X = $minX; Y = $minY; Width = ($maxX - $minX + 1); Height = ($maxY - $minY + 1) }
}

# One halving step, high quality.
function Invoke-Halve {
    param([System.Drawing.Image]$Source)
    $w = [int][math]::Max(1, [math]::Floor($Source.Width / 2))
    $h = [int][math]::Max(1, [math]::Floor($Source.Height / 2))
    $dst = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $gfx = [System.Drawing.Graphics]::FromImage($dst)
    $gfx.CompositingMode     = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $gfx.CompositingQuality  = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $gfx.InterpolationMode   = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $gfx.PixelOffsetMode     = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $gfx.DrawImage($Source, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), 0, 0, $Source.Width, $Source.Height, [System.Drawing.GraphicsUnit]::Pixel)
    $gfx.Dispose()
    return $dst
}

# Scale to an exact size: halve until within 2x, then one bicubic step.
# The caller's image is never disposed - only the intermediate halvings.
function Get-ScaledTo {
    param([System.Drawing.Image]$Source, [int]$TargetWidth, [int]$TargetHeight)

    $cur = $Source
    $ownsCur = $false
    while (($cur.Width -gt $TargetWidth * 2) -and ($cur.Height -gt $TargetHeight * 2)) {
        $next = Invoke-Halve -Source $cur
        if ($ownsCur) { $cur.Dispose() }
        $cur = $next
        $ownsCur = $true
    }

    $dst = New-Object System.Drawing.Bitmap $TargetWidth, $TargetHeight, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $gfx = [System.Drawing.Graphics]::FromImage($dst)
    $gfx.CompositingMode     = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $gfx.CompositingQuality  = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $gfx.InterpolationMode   = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $gfx.PixelOffsetMode     = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $gfx.DrawImage($cur, (New-Object System.Drawing.Rectangle 0, 0, $TargetWidth, $TargetHeight), 0, 0, $cur.Width, $cur.Height, [System.Drawing.GraphicsUnit]::Pixel)
    $gfx.Dispose()
    if ($ownsCur) { $cur.Dispose() }

    return $dst
}

# A copy of one rectangle of an image.
function Get-Cropped {
    param([System.Drawing.Image]$Source, $Box)

    $dst = New-Object System.Drawing.Bitmap $Box.Width, $Box.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $gfx = [System.Drawing.Graphics]::FromImage($dst)
    $gfx.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $gfx.DrawImage($Source, (New-Object System.Drawing.Rectangle 0, 0, $Box.Width, $Box.Height), $Box.X, $Box.Y, $Box.Width, $Box.Height, [System.Drawing.GraphicsUnit]::Pixel)
    $gfx.Dispose()
    return $dst
}

# Flattens every pixel to one colour, keeping the original alpha.
#
# Done on the raw BGRA bytes rather than with a ColorMatrix: a matrix that maps
# every channel to a constant is singular, and GDI+ silently discards the
# translation column of a singular matrix - the result comes out black.
function Get-Flat {
    param([System.Drawing.Image]$Source, [byte]$Red, [byte]$Grn, [byte]$Blu)

    $w = $Source.Width; $h = $Source.Height
    $bmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $gfx = [System.Drawing.Graphics]::FromImage($bmp)
    $gfx.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $gfx.DrawImage($Source, 0, 0, $w, $h)
    $gfx.Dispose()

    $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
    $data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $bytes = New-Object byte[] ($data.Stride * $h)
    [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)

    # A 32bpp bitmap is BGRA in memory: byte 0 is blue, byte 2 is red.
    for ($i = 0; $i -lt $bytes.Length; $i += 4) {
        if ($bytes[$i + 3] -gt 0) {
            $bytes[$i]     = $Blu
            $bytes[$i + 1] = $Grn
            $bytes[$i + 2] = $Red
        }
    }

    [System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytes.Length)
    $bmp.UnlockBits($data)

    return $bmp
}

# Save a bitmap as PNG and report the size.
function Save-Png {
    param([System.Drawing.Image]$Image, [string]$OutPath)
    $Image.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
    return (Get-Item $OutPath).Length
}

# The mark centred on an opaque ink canvas, for the app icons.
function Save-IconOnCanvas {
    param([System.Drawing.Image]$Mark, [string]$OutPath, [int]$Size)

    $bmp = New-Object System.Drawing.Bitmap $Size, $Size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $gfx = [System.Drawing.Graphics]::FromImage($bmp)
    $gfx.CompositingMode     = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
    $gfx.CompositingQuality  = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $gfx.InterpolationMode   = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $gfx.PixelOffsetMode     = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $gfx.Clear([System.Drawing.Color]::FromArgb(255, $InkR, $InkG, $InkB))
    $gfx.DrawImage($Mark, [int][math]::Round(($Size - $Mark.Width) / 2), [int][math]::Round(($Size - $Mark.Height) / 2))
    $gfx.Dispose()

    $bytes = Save-Png -Image $bmp -OutPath $OutPath
    $bmp.Dispose()
    return $bytes
}

# The mark on a TRANSPARENT square, for the browser tab.
#
# A favicon is drawn on whatever the tab bar happens to be - a dark square
# behind the mark reads as a black box bolted onto the tab strip. Leaving the
# background empty lets the mark sit straight on the tab colour.
#
# The device icons do NOT use this: iOS composites a transparent
# apple-touch-icon onto black, so those keep an opaque canvas.
function Save-IconTransparent {
    param([System.Drawing.Image]$Mark, [string]$OutPath, [int]$Size)

    $bmp = New-Object System.Drawing.Bitmap $Size, $Size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $gfx = [System.Drawing.Graphics]::FromImage($bmp)
    $gfx.CompositingMode     = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $gfx.CompositingQuality  = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $gfx.InterpolationMode   = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $gfx.PixelOffsetMode     = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $gfx.Clear([System.Drawing.Color]::Transparent)
    $gfx.DrawImage($Mark, [int][math]::Round(($Size - $Mark.Width) / 2), [int][math]::Round(($Size - $Mark.Height) / 2))
    $gfx.Dispose()

    $bytes = Save-Png -Image $bmp -OutPath $OutPath
    $bmp.Dispose()
    return $bytes
}

# ── 1. the lockup ──────────────────────────────────────────────────────────

Write-Host "Source: app\assets\logo\logo.png"
$logoImage = [System.Drawing.Image]::FromFile($LogoSrc)
Write-Host ("  {0} x {1}  {2}" -f $logoImage.Width, $logoImage.Height, $logoImage.PixelFormat)

$logoBytes = Get-PixelBytes -Image $logoImage
$profile = Get-MatteProfile -Bytes $logoBytes -Width $logoImage.Width -Height $logoImage.Height -Cut $InkCut

# The mark and the wordmark are separated by a run of empty columns. Find the
# first such run that is wide enough to be a real gap rather than a letter
# counter.
$firstInk = -1
for ($x = 0; $x -lt $logoImage.Width; $x++) { if ($profile.Cols[$x] -gt 0) { $firstInk = $x; break } }

$gapStart = -1; $gapEnd = -1; $run = 0
for ($x = $firstInk; $x -lt $logoImage.Width; $x++) {
    if ($profile.Cols[$x] -eq 0) {
        if ($run -eq 0) { $gapStart = $x }
        $run++
    } else {
        if ($run -ge 16) { $gapEnd = $x - 1; break }
        $run = 0
    }
}
if ($gapStart -lt 0) { throw "Could not split the lockup into mark and wordmark." }
if ($gapEnd -lt 0) { $gapEnd = $logoImage.Width - 1 }

$markBox = Get-MatteBox -Bytes $logoBytes -Width $logoImage.Width -Height $logoImage.Height -X0 $firstInk -X1 ($gapStart - 1) -Y0 0 -Y1 ($logoImage.Height - 1) -Cut $InkCut
$wordLeft = $gapEnd + 1

# The wordmark is the first band of ink below the top of the right-hand block;
# the descriptor line sits under it, separated by a clear gap.
$wordTop = -1
for ($y = 0; $y -lt $logoImage.Height; $y++) {
    $count = 0
    for ($x = $wordLeft; $x -lt $logoImage.Width; $x++) {
        if ([math]::Min($logoBytes[($y * $logoImage.Width + $x) * 4 + 2], [math]::Min($logoBytes[($y * $logoImage.Width + $x) * 4 + 1], $logoBytes[($y * $logoImage.Width + $x) * 4])) -lt $InkCut) { $count++ }
    }
    if ($count -gt 0) { $wordTop = $y; break }
}
$wordBottom = $wordTop
for ($y = $wordTop; $y -lt $logoImage.Height; $y++) {
    $count = 0
    for ($x = $wordLeft; $x -lt $logoImage.Width; $x++) {
        if ([math]::Min($logoBytes[($y * $logoImage.Width + $x) * 4 + 2], [math]::Min($logoBytes[($y * $logoImage.Width + $x) * 4 + 1], $logoBytes[($y * $logoImage.Width + $x) * 4])) -lt $InkCut) { $count++ }
    }
    if ($count -gt 0) { $wordBottom = $y } else { break }
}
$wordBox = Get-MatteBox -Bytes $logoBytes -Width $logoImage.Width -Height $logoImage.Height -X0 $wordLeft -X1 ($logoImage.Width - 1) -Y0 $wordTop -Y1 $wordBottom -Cut $InkCut

Write-Host ("  mark      : x {0}..{1}  y {2}..{3}   {4}x{5}" -f $markBox.X, ($markBox.X + $markBox.Width - 1), $markBox.Y, ($markBox.Y + $markBox.Height - 1), $markBox.Width, $markBox.Height)
Write-Host ("  wordmark  : x {0}..{1}  y {2}..{3}   {4}x{5}" -f $wordBox.X, ($wordBox.X + $wordBox.Width - 1), $wordBox.Y, ($wordBox.Y + $wordBox.Height - 1), $wordBox.Width, $wordBox.Height)

$sourceGap = $wordBox.X - $markBox.X - $markBox.Width
Write-Host ("  gap between them: {0} px" -f $sourceGap)

$logoBytes = $null

# Compose the lockup that ships: the mark, the source gap, and the wordmark
# centred on the mark. The descriptor line is not part of it - at header size
# it is five pixels high.
function New-Lockup {
    param([System.Drawing.Image]$Source, $MarkBox, $WordBox, [int]$Gap, [int]$TargetHeight)

    $scale = $TargetHeight / [math]::Max($MarkBox.Height, $WordBox.Height)
    $markW = [int][math]::Round($MarkBox.Width * $scale)
    $markH = [int][math]::Round($MarkBox.Height * $scale)
    $wordW = [int][math]::Round($WordBox.Width * $scale)
    $wordH = [int][math]::Round($WordBox.Height * $scale)
    $gapPx = [int][math]::Round($Gap * $scale)

    $markCrop = Get-Cropped -Source $Source -Box $MarkBox
    $markScaled = Get-ScaledTo -Source $markCrop -TargetWidth $markW -TargetHeight $markH
    $markCrop.Dispose()

    $wordCrop = Get-Cropped -Source $Source -Box $WordBox
    $wordScaled = Get-ScaledTo -Source $wordCrop -TargetWidth $wordW -TargetHeight $wordH
    $wordCrop.Dispose()

    # Still opaque, still on white: the matte only becomes alpha at the end.
    $canvas = New-Object System.Drawing.Bitmap ($markW + $gapPx + $wordW), $TargetHeight, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $gfx = [System.Drawing.Graphics]::FromImage($canvas)
    $gfx.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $gfx.Clear([System.Drawing.Color]::White)
    $gfx.DrawImage($markScaled, 0, 0)
    $gfx.DrawImage($wordScaled, $markW + $gapPx, [int][math]::Round(($TargetHeight - $wordH) / 2))
    $gfx.Dispose()

    $markScaled.Dispose(); $wordScaled.Dispose()
    return $canvas
}

$webCanvas = New-Lockup -Source $logoImage -MarkBox $markBox -WordBox $wordBox -Gap $sourceGap -TargetHeight $WebHeight
$masterCanvas = New-Lockup -Source $logoImage -MarkBox $markBox -WordBox $wordBox -Gap $sourceGap -TargetHeight $MasterHeight
$logoImage.Dispose()

$web = ConvertTo-Transparent -Image $webCanvas
$webCanvas.Dispose()
$master = ConvertTo-Transparent -Image $masterCanvas
$masterCanvas.Dispose()

$webW = $web.Width
$masterW = $master.Width

Write-Host ''
Write-Host 'Lockup written:'

$out = Join-Path $PublicDir 'logo.png'
$size = Save-Png -Image $web -OutPath $out
Write-Host ("  {0,-22} {1,4}x{2,-4} {3,9:N0} bytes  (colour, web)" -f 'logo.png', $webW, $WebHeight, $size)

$out = Join-Path $PublicDir 'logo-master.png'
$size = Save-Png -Image $master -OutPath $out
Write-Host ("  {0,-22} {1,4}x{2,-4} {3,9:N0} bytes  (colour, master)" -f 'logo-master.png', $masterW, $MasterHeight, $size)

$out = Join-Path $PublicDir 'logo-dark.png'
$flatInk = Get-Flat -Source $web -Red $InkR -Grn $InkG -Blu $InkB
$size = Save-Png -Image $flatInk -OutPath $out
$flatInk.Dispose()
Write-Host ("  {0,-22} {1,4}x{2,-4} {3,9:N0} bytes  (ink)" -f 'logo-dark.png', $webW, $WebHeight, $size)

$out = Join-Path $PublicDir 'logo-inverse.png'
$flatWhite = Get-Flat -Source $web -Red $WhR -Grn $WhG -Blu $WhB
$size = Save-Png -Image $flatWhite -OutPath $out
$flatWhite.Dispose()
Write-Host ("  {0,-22} {1,4}x{2,-4} {3,9:N0} bytes  (white)" -f 'logo-inverse.png', $webW, $WebHeight, $size)

# ── 2. the icons ───────────────────────────────────────────────────────────

Write-Host ''
Write-Host "Source: app\assets\icon\icon.png"
$iconImage = [System.Drawing.Image]::FromFile($IconSrc)
Write-Host ("  {0} x {1}  {2}" -f $iconImage.Width, $iconImage.Height, $iconImage.PixelFormat)

$iconBytes = Get-PixelBytes -Image $iconImage
$iconBox = Get-MatteBox -Bytes $iconBytes -Width $iconImage.Width -Height $iconImage.Height -X0 0 -X1 ($iconImage.Width - 1) -Y0 0 -Y1 ($iconImage.Height - 1) -Cut $InkCut
$iconBytes = $null
Write-Host ("  mark      : x {0}..{1}  y {2}..{3}   {4}x{5}" -f $iconBox.X, ($iconBox.X + $iconBox.Width - 1), $iconBox.Y, ($iconBox.Y + $iconBox.Height - 1), $iconBox.Width, $iconBox.Height)

$iconCrop = Get-Cropped -Source $iconImage -Box $iconBox
$iconImage.Dispose()

Write-Host ''
Write-Host 'Icons written:'
foreach ($spec in @(
    @{ Name = 'favicon.png';           Size = 64;  Inset = 0.06; Canvas = $false },
    @{ Name = 'apple-touch-icon.png';  Size = 180; Inset = 0.08; Canvas = $true },
    @{ Name = 'icon-192.png';          Size = 192; Inset = 0.08; Canvas = $true },
    @{ Name = 'icon-512.png';          Size = 512; Inset = 0.08; Canvas = $true }
)) {
    $inner = $spec.Size * (1 - 2 * $spec.Inset)
    $scale = $inner / [math]::Max($iconCrop.Width, $iconCrop.Height)
    $w = [int][math]::Round($iconCrop.Width * $scale)
    $h = [int][math]::Round($iconCrop.Height * $scale)

    $scaled = Get-ScaledTo -Source $iconCrop -TargetWidth $w -TargetHeight $h
    $transparent = ConvertTo-Transparent -Image $scaled
    $scaled.Dispose()

    $out = Join-Path $PublicDir $spec.Name
    if ($spec.Canvas) {
        $size = Save-IconOnCanvas -Mark $transparent -OutPath $out -Size $spec.Size
        $note = 'orange mark on ink'
    } else {
        $size = Save-IconTransparent -Mark $transparent -OutPath $out -Size $spec.Size
        $note = 'orange mark, transparent'
    }
    $transparent.Dispose()
    Write-Host ("  {0,-22} {1,4}x{1,-4} {2,9:N0} bytes  ({3})" -f $spec.Name, $spec.Size, $size, $note)
}
$iconCrop.Dispose()

$web.Dispose(); $master.Dispose()

Write-Host ''
Write-Host ("Lockup: {0}x{1} (web), aspect {2:N2}:1" -f $webW, $WebHeight, ($webW / $WebHeight))
Write-Host 'Done. Sources of truth: app\assets\logo\logo.png and app\assets\icon\icon.png'
