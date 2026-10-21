# =============================================================================
# prepare-logo.ps1 - generate the shippable logo assets from the source PNG.
#
# Reference: plans/MULTIPAGE_UI_PLAN.md 5.5 (processing) and 5.5a (colour decision).
#
# WHY THIS EXISTS
#   logo/Creaova_Logo1.png is 1,144,362 bytes (1.09 MB), 1254x1254, 24-bit RGB with
#   NO alpha channel, and 78% of its canvas is dead padding. Shipped raw it would
#   blow the performance budget on its own.
#
# WHAT IT DOES
#   1. Crops to the artwork, excluding the noise documented below.
#   2. Keys the uniform white background to alpha, so edges stay anti-aliased.
#   3. Writes two variants at the SAME alpha:
#        - public/logo.png          as supplied - orange mark + ink wordmark
#        - public/logo-inverse.png  dark-surface variant: flat white silhouette
#                                   of the whole lockup (footer)
#   4. Resizes to a retina-safe width.
#
# MEASURED GEOMETRY of Creaova_Logo1.png (1254x1254), by row/column ink profiling:
#
#   band  content                    y-range     x-range      size
#   ----  -------------------------  ----------  -----------  ---------
#   1     mark (orange)              243..583     462..779    318 x 341
#   2     wordmark "CREAOVA"         648..770     173..1084   912 x 123
#   5     tagline                    892..931     405..849    445 x  40
#   3,4,6,7  compression-noise specks - scattered as far as y 995, 2-18 px each
#
#   The specks matter: a naive "crop to non-white bounds" would extend the crop to
#   y 995, adding 64 px of dead space below the tagline for the sake of a handful
#   of stray pixels.
#
#   The tagline is deliberately EXCLUDED from the asset. It is brand copy that is
#   rendered as live text on the page, and carrying it inside the logo costs the
#   wordmark half its size: at a 48 px render the wordmark cap-height would drop
#   from 11.2 px (comfortably legible) to 8.6 px (mush). The mark + wordmark lockup
#   is 912 x 528, aspect 1.73.
#
# WHY THE INVERSE IS FLAT WHITE (user decision, 2026-10-22)
#   The dark-surface variant must read as ONE clean lockup on --dark
#   (#16130F) - "the footer logo should be clear white", not scratched.
#
#   The previous variant kept the saturated orange pixels and mapped only the
#   neutral ones to white. Measured on the source artwork, that split the mark
#   roughly in half: the orange outer arc stayed orange while the near-black
#   core became white, and the two met along a noisy anti-aliased edge that
#   pixel-profiled as a band of mixed pixels (x/o in the warmth map). At the
#   size the footer renders it, that band reads as scratched, speckled
#   artwork - the logo looked damaged rather than designed.
#
#   Flat white fixes it at the root: one colour for the whole lockup, so the
#   silhouette stays crisp at any size and the mark can no longer show a
#   mottled seam. The alpha mask is reused unchanged, so the artwork's
#   geometry is exactly the same as the ink variant - only the colour
#   changes. The brand orange is not lost: it is the ink mark's colour on the
#   light surfaces, and the site's accent colour everywhere else.
#
# The source file is NEVER modified, so the artwork can be re-derived if a vector
# ever arrives.
#
# DEPENDENCY-FREE BY DESIGN: System.Drawing ships with Windows. No `sharp`, no
# ImageMagick, no npm package. This is a one-off asset generator; its OUTPUT is
# what ships, not a runtime dependency.
#
# Usage:  powershell -ExecutionPolicy Bypass -File scripts/prepare-logo.ps1
# =============================================================================

Add-Type -AssemblyName System.Drawing
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# --- Configuration ----------------------------------------------------------

$SourcePath = Join-Path $PSScriptRoot '..\app\assets\images\logo\Creaova_Logo1.png'
$OutDir     = Join-Path $PSScriptRoot '..\public'

# Crop rectangle in source pixels - measured, not guessed. Mark + wordmark only.
$CropX = 173
$CropY = 243
$CropW = 912     # wordmark x 173..1084
$CropH = 528     # y 243..770 = mark top (243) through wordmark baseline (770)

# Output width. Renders at most ~200 px CSS wide; 480 px is comfortably retina-safe.
$TargetW = 480

# Deviation from the background at which a pixel counts as fully opaque ink.
$FullOpacityAt = 200.0

# Neutral target for pixels that map to white in the dark-surface variant.
$InvR = 255; $InvG = 255; $InvB = 255

# --- Load the source --------------------------------------------------------

if (-not (Test-Path $SourcePath)) { throw "Source logo not found: $SourcePath" }
if (-not (Test-Path $OutDir))     { throw "Output directory not found: $OutDir" }

$sourceBytes = (Get-Item $SourcePath).Length

$src     = [System.Drawing.Bitmap]::new($SourcePath)
$srcRect = [System.Drawing.Rectangle]::new(0, 0, $src.Width, $src.Height)
$srcData = $src.LockBits($srcRect,
            [System.Drawing.Imaging.ImageLockMode]::ReadOnly,
            [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$srcStride = $srcData.Stride
$srcPixels = [byte[]]::new($srcStride * $src.Height)
[System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcPixels, 0, $srcPixels.Length)
$src.UnlockBits($srcData)

if (($CropX + $CropW) -gt $src.Width -or ($CropY + $CropH) -gt $src.Height) {
  throw 'Crop rectangle falls outside the source image.'
}

# Determine the true background level from the crop corners rather than assuming
# it is exactly 255. The source is a flat, near-white field.
$bgSamples = @()
foreach ($p in @(
  @($CropX, $CropY),
  @(($CropX + $CropW - 1), $CropY),
  @($CropX, ($CropY + $CropH - 1)),
  @(($CropX + $CropW - 1), ($CropY + $CropH - 1))
)) {
  $i = ($p[1] * $srcStride) + ($p[0] * 3)
  $bgSamples += [Math]::Max($srcPixels[$i], [Math]::Max($srcPixels[$i + 1], $srcPixels[$i + 2]))
}
$bgLevel = [int](($bgSamples | Measure-Object -Average).Average)

Write-Host 'source      : Creaova_Logo1.png'
Write-Host ("              {0} x {1}, {2:N0} bytes" -f $src.Width, $src.Height, $sourceBytes)
Write-Host ("crop        : {0} x {1} at ({2},{3})  - mark + wordmark" -f $CropW, $CropH, $CropX, $CropY)
Write-Host ("background  : {0} (sampled from crop corners)" -f $bgLevel)
if ($bgLevel -lt 235) { throw "Background is not near-white (sampled $bgLevel); refusing to key." }

# --- Pass 1: crop + key white -> alpha, keeping the supplied colours ---------

$ink = [System.Drawing.Bitmap]::new($CropW, $CropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$outRect = [System.Drawing.Rectangle]::new(0, 0, $CropW, $CropH)
$inkData = $ink.LockBits($outRect,
           [System.Drawing.Imaging.ImageLockMode]::WriteOnly,
           [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$inkStride = $inkData.Stride
$inkPixels = [byte[]]::new($inkStride * $CropH)

$alphaHistogram = [int[]]::new(256)
$opaqueCount = 0
$clearCount  = 0

for ($y = 0; $y -lt $CropH; $y++) {
  $srcRow = ($CropY + $y) * $srcStride
  $inkRow = $y * $inkStride
  for ($x = 0; $x -lt $CropW; $x++) {
    $si = $srcRow + ($CropX + $x) * 3
    # Format24bppRgb is BGR in memory on little-endian, NOT RGB. Reading this
    # backwards swaps red/blue and turns the orange mark navy in the output -
    # that bug shipped once and must not return.
    $bl = $srcPixels[$si]; $g = $srcPixels[$si + 1]; $r = $srcPixels[$si + 2]

    # Per-channel distance from the background, taking the MAX. Luminance would be
    # wrong here: the mark is a saturated orange whose luminance sits mid-range, so
    # a luminance key would render it as semi-transparent grey.
    $dev = [Math]::Max($bgLevel - $r, [Math]::Max($bgLevel - $g, $bgLevel - $bl))

    $a = $dev / $FullOpacityAt
    if     ($a -gt 1.0) { $a = 1.0 }
    elseif ($a -lt 0.0) { $a = 0.0 }
    $alpha = [int][Math]::Round($a * 255)

    $alphaHistogram[$alpha]++
    if ($alpha -ge 250) { $opaqueCount++ }
    if ($alpha -le 5)   { $clearCount++ }

    $oi = $inkRow + $x * 4
    # Deliberately NOT flattened: the supplied two-tone is preserved exactly.
    # 32bppArgb is BGRA in memory on little-endian.
    $inkPixels[$oi]     = [byte]$bl
    $inkPixels[$oi + 1] = [byte]$g
    $inkPixels[$oi + 2] = [byte]$r
    $inkPixels[$oi + 3] = [byte]$alpha
  }
}
[System.Runtime.InteropServices.Marshal]::Copy($inkPixels, 0, $inkData.Scan0, $inkPixels.Length)
$ink.UnlockBits($inkData)

# --- Pass 2: the dark-surface variant, from the same alpha -------------------
#
# FLAT WHITE. Every opaque pixel becomes pure white and the alpha channel is
# carried over untouched, so the inverse is the ink variant's exact silhouette
# in a single colour. No per-pixel hue decision is made here on purpose: the
# previous "keep the warm pixels" rule is what split the mark into a mottled
# orange-and-white shape (see the WHY block at the top of this file).

$inv = [System.Drawing.Bitmap]::new($CropW, $CropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$invData = $inv.LockBits($outRect,
           [System.Drawing.Imaging.ImageLockMode]::WriteOnly,
           [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$invStride = $invData.Stride
$invPixels = [byte[]]::new($invStride * $CropH)

for ($y = 0; $y -lt $CropH; $y++) {
  $inkRow = $y * $inkStride
  $invRow = $y * $invStride
  for ($x = 0; $x -lt $CropW; $x++) {
    $oi = $inkRow + $x * 4
    $ni = $invRow + $x * 4
    $invPixels[$ni]     = [byte]$InvB
    $invPixels[$ni + 1] = [byte]$InvG
    $invPixels[$ni + 2] = [byte]$InvR
    # The alpha ramp is the artwork's edge anti-aliasing - keep it exactly.
    $invPixels[$ni + 3] = $inkPixels[$oi + 3]
  }
}
[System.Runtime.InteropServices.Marshal]::Copy($invPixels, 0, $invData.Scan0, $invPixels.Length)
$inv.UnlockBits($invData)

# --- Pass 3: resize and write ----------------------------------------------

function Save-LogoPng {
  param(
    [System.Drawing.Bitmap]$Source,
    [int]$Width,
    [string]$Path,
    # Normalise near-white NEUTRAL pixels to exactly 255,255,255 after the
    # resize. HighQualityBicubic overshoots on the alpha ramp, which leaves a
    # few fully-opaque pixels sitting at 250-254 instead of 255 - invisible,
    # but it means the asset is not literally flat white.
    [switch]$PurifyWhite
  )
  $height = [int][Math]::Round($Source.Height * ($Width / [double]$Source.Width))
  $dest = [System.Drawing.Bitmap]::new($Width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($dest)

  # SourceCopy is essential. The default blending mode composites the source
  # against the destination, which would darken the anti-aliased edges into a
  # halo. SourceCopy keeps the alpha channel honest.
  $g.CompositingMode    = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($Source, 0, 0, $Width, $height)
  $g.Dispose()

  if ($PurifyWhite) {
    # HighQualityBicubic overshoots on the alpha ramp, which leaves a few
    # fully-opaque WHITE pixels sitting at 250-254 instead of 255. Invisible,
    # but it means the asset is not literally flat white. Normalise only pixels
    # that are already neutral and near-white; orange pixels keep their colour.
    $r2 = [System.Drawing.Rectangle]::new(0, 0, $Width, $height)
    $d2 = $dest.LockBits($r2,
          [System.Drawing.Imaging.ImageLockMode]::ReadWrite,
          [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $st2 = $d2.Stride
    $px2 = [byte[]]::new($st2 * $height)
    [System.Runtime.InteropServices.Marshal]::Copy($d2.Scan0, $px2, 0, $px2.Length)
    for ($i = 0; $i -lt $px2.Length; $i += 4) {
      $pb = $px2[$i]; $pg = $px2[$i + 1]; $pr = $px2[$i + 2]
      if ($pr -ge 248 -and [Math]::Abs($pr - $pg) -le 3 -and [Math]::Abs($pg - $pb) -le 3) {
        $px2[$i] = 255; $px2[$i + 1] = 255; $px2[$i + 2] = 255
      }
    }
    [System.Runtime.InteropServices.Marshal]::Copy($px2, 0, $d2.Scan0, $px2.Length)
    $dest.UnlockBits($d2)
  }

  $dest.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $dest.Dispose()

  return @{ Width = $Width; Height = $height }
}

$inkPath = Join-Path $OutDir 'logo.png'
$invPath = Join-Path $OutDir 'logo-inverse.png'

$inkDim = Save-LogoPng -Source $ink -Width $TargetW -Path $inkPath
$invDim = Save-LogoPng -Source $inv -Width $TargetW -Path $invPath -PurifyWhite

$ink.Dispose(); $inv.Dispose(); $src.Dispose()

# --- Report -----------------------------------------------------------------

$inkSize = (Get-Item $inkPath).Length
$invSize = (Get-Item $invPath).Length
$total   = $CropW * $CropH

function Show-Bin {
  param([string]$Label, [int]$From, [int]$To)
  $sum = 0
  for ($i = $From; $i -le $To; $i++) { $sum += $alphaHistogram[$i] }
  Write-Host ("  {0,-26} {1,9:N0} px  {2,6:N1}%" -f $Label, $sum, (100.0 * $sum / $total))
}

Write-Host ''
Write-Host 'alpha distribution (a healthy key has most pixels either fully clear or fully solid)'
Show-Bin 'fully transparent (0-5)'   0 5
Show-Bin 'anti-aliased edge (6-199)' 6 199
Show-Bin 'fully opaque (250-255)'    250 255

Write-Host ''
Write-Host 'written'
Write-Host ("  {0,-24} {1,4} x {2,-4} {3,8:N0} bytes" -f 'public/logo.png', $inkDim.Width, $inkDim.Height, $inkSize)
Write-Host ("  {0,-24} {1,4} x {2,-4} {3,8:N0} bytes" -f 'public/logo-inverse.png', $invDim.Width, $invDim.Height, $invSize)
Write-Host ("  {0,-24} {1,8:N0} bytes  ->  {2:N0} bytes for BOTH  ({3:N1}% smaller)" -f `
  'source', $sourceBytes, ($inkSize + $invSize), (100.0 * (1 - ($inkSize + $invSize) / $sourceBytes)))

Write-Host ''
Write-Host 'navbar projection, mark + wordmark lockup (aspect 1.73)'
foreach ($cssH in @(36, 44, 48, 52, 56)) {
  $ratio = $cssH / [double]$CropH
  $wordPx = 123 * $ratio
  $fontPx = [Math]::Round($wordPx / 0.72, 1)
  $retinaNeeded = [int][Math]::Ceiling($CropW * $ratio * 2)
  $verdict = if ($cssH -lt 40) { 'tight' } elseif ($cssH -le 52) { 'good' } else { 'roomy' }
  Write-Host ("  lockup {0,3}px tall -> {1,5:N1}px wide | wordmark {2,4:N1}px cap ~= {3,4:N1}px text | needs {4,4}px @2x  {5}" -f `
    $cssH, ($CropW * $ratio), $wordPx, $fontPx, $retinaNeeded, $verdict)
}
