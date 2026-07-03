# Photo Location Register

Generated: 2026-06-05  
Machine scope searched: `/Users/petersmith`, `/Volumes/RedBlack`, `/Volumes/SanDisk1T`  
Image extensions counted: `jpg`, `jpeg`, `heic`, `png`, `tif`, `tiff`, `raw`, `cr2`, `cr3`, `nef`, `arw`, `dng`, `rw2`, `orf`, `raf`, `webp`

## High-Value Photo Locations

| Location | Image count | Notes |
|---|---:|---|
| `/Users/petersmith/Library/CloudStorage/OneDrive-Personal/Pictures` | 849 | Largest local photo-bearing cloud folder found. Includes `gr-ii`, `Camera Roll`, and `Mobile uploads`. |
| `/Users/petersmith/Library/CloudStorage/Dropbox` | 509 | Main Dropbox photo location. Strongest subfolder is `@pix`; also includes `Screenshots`. |
| `/Volumes/RedBlack/gr-ii` | 507 | External SSD photo-looking archive, matching the `gr-ii` structure also present in OneDrive. |
| `/Users/petersmith/Documents/transit/My Pictures` | 167 | Older local photo folder, mainly `@Canada 2008`. |

## Provider Folders Checked

### Dropbox

Primary local Dropbox folder:

- `/Users/petersmith/Library/CloudStorage/Dropbox` - 509 image files

Notable Dropbox subfolders:

| Subfolder | Image count |
|---|---:|
| `/Users/petersmith/Library/CloudStorage/Dropbox/@pix/25-02-06` | 82 |
| `/Users/petersmith/Library/CloudStorage/Dropbox/@pix/25-07-01` | 57 |
| `/Users/petersmith/Library/CloudStorage/Dropbox/Screenshots` | 53 |
| `/Users/petersmith/Library/CloudStorage/Dropbox/@pix/25-07-18` | 49 |
| `/Users/petersmith/Library/CloudStorage/Dropbox/@pix/25-05-26` | 46 |
| `/Users/petersmith/Library/CloudStorage/Dropbox/@pix/25-07-08` | 35 |
| `/Users/petersmith/Library/CloudStorage/Dropbox/@pix/25-05-17` | 34 |
| `/Users/petersmith/Library/CloudStorage/Dropbox/@pix/25-06-17` | 33 |
| `/Users/petersmith/Library/CloudStorage/Dropbox/@pix/25-04-15` | 32 |
| `/Users/petersmith/Library/CloudStorage/Dropbox/@pix/25-03-08` | 28 |

Other Dropbox support/application folders found, but not treated as photo repositories:

- `/Users/petersmith/Library/Application Support/Dropbox`
- `/Users/petersmith/Library/Dropbox`
- `/Applications/Dropbox.app`
- `/Users/petersmith/Applications/Chrome Apps.localized/File System for Dropbox.app`

### Amazon

No local Amazon Photos or Amazon Drive photo repository was found by name search or Spotlight name search.

Amazon-related folders/apps found appear to be application support rather than persisted photo libraries:

- `/Applications/Amazon Kindle.app`
- `/Users/petersmith/Library/Application Scripts/com.amazon.Lassen`
- `/Users/petersmith/Library/Application Scripts/com.amazon.aiv.AIVApp`
- `/Users/petersmith/Library/Containers/com.amazon.Lassen`
- `/Users/petersmith/Library/Containers/com.amazon.aiv.AIVApp`
- `/Users/petersmith/Library/Group Containers/group.com.amazon.Lassen`
- `/Users/petersmith/Library/Group Containers/group.com.amazon.aiv.AIVApp`
- `/Users/petersmith/.aws/amazonq`

Practical reading: Amazon photo persistence is not visible as a synced local folder on this machine. If Amazon Photos is used, it may be browser/app/cloud-only rather than filesystem-backed here.

### iDrive

No local iDrive photo repository was found by directory-name search or Spotlight name search.

Practical reading: iDrive is either not installed, not syncing to a normally named local folder, or is storing data somewhere not discoverable by these name-based filesystem searches.

## Attached SSDs / Volumes

Mounted volumes checked:

- `/Volumes/RedBlack`
- `/Volumes/SanDisk1T`

Photo-looking locations on external storage:

| Location | Image count | Notes |
|---|---:|---|
| `/Volumes/RedBlack/gr-ii` | 507 | Strong photo candidate. |
| `/Volumes/RedBlack/gr-ii/2019-08` | 152 | Subfolder. |
| `/Volumes/RedBlack/gr-ii/2026-05-16` | 138 | Subfolder. |
| `/Volumes/RedBlack/gr-ii/2019-11` | 80 | Subfolder. |
| `/Volumes/RedBlack/gr-ii/2019-12` | 75 | Subfolder. |
| `/Volumes/RedBlack/gr-ii/2019-12-02` | 28 | Subfolder. |
| `/Volumes/RedBlack/gr-ii/2019-11-02` | 22 | Subfolder. |
| `/Volumes/RedBlack/gr-ii/2019-09` | 12 | Subfolder. |

External folders with images that look like software/media assets rather than personal photographs:

- `/Volumes/SanDisk1T/UnifyContent/...` - 238 image files total under SanDisk, mostly Unify/music-library media and patch artwork.
- `/Volumes/RedBlack/SteamLibrary/...` - many image files, apparently X-Plane/game resources.
- `/Volumes/RedBlack/Downloads Cache/...` - app/resource images.
- `/Volumes/RedBlack/oneDrive/Pictures` - folder exists, but no counted image files.

## Other Local Findings

| Location | Image count | Notes |
|---|---:|---|
| `/Users/petersmith/Pictures` | 0 | Contains `Photos Library.photoslibrary`, but no image files exposed by normal traversal. |
| `/Users/petersmith/Pictures/Photos Library.photoslibrary` | 0 | Apple Photos package exists, but no counted local image assets were visible. |
| `/Users/petersmith/Documents/Photos` | 0 | Current workspace; no counted image files. |

## Caveats

- Counts are filesystem-visible local files only. Cloud providers may have remote-only files that do not appear locally until downloaded.
- Searches were based on common image extensions and directory names. Unusual extensions, encrypted backup stores, package databases, or hidden provider caches may require provider-specific tools.
- Software resource images were intentionally separated from likely personal photograph locations. Otherwise the map becomes a junk drawer with delusions of grandeur.
