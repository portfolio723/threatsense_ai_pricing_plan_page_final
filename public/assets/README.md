# Public Assets Directory

Store public static assets here. Files in `public/` are accessible directly by URL in the browser and in Next.js components:

- **Images**: `/public/assets/images/` -> Accessible at `/assets/images/filename.png` or `src="/assets/images/filename.png"`
- **Media (Videos/Audio/PDFs)**: `/public/assets/media/` -> Accessible at `/assets/media/filename.mp4`
- **Icons**: `/public/assets/icons/` -> Accessible at `/assets/icons/filename.svg`

### Usage in Next.js:

```tsx
// Using Next.js Image component
import Image from 'next/image';

<Image 
  src="/assets/images/example.png" 
  alt="Example" 
  width={400} 
  height={300} 
/>

// Using regular img tag
<img src="/assets/images/example.png" alt="Example" />
```
