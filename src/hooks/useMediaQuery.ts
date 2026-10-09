import { useState } from 'react'; export const useMediaQuery = (_query: string) => { const [matches] = useState(false); return matches; };
