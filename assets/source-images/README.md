# Original image sources

These are the unmodified 1376×768 PNG screenshots from which the optimised
WebP covers in `public/images/projects-images/` were generated.

They live outside `public/` on purpose: they are source assets, not deployed
files, so visitors never download the much larger PNG originals. The site and
the reference mockups reference only the WebP versions.

Regenerate a WebP cover with Pillow:

```python
from PIL import Image

with Image.open("assets/source-images/<project>/<file>.png") as img:
    img.convert("RGB").save(
        "public/images/projects-images/<project>/<file>.webp",
        "WEBP", quality=82, method=6,
    )
```
