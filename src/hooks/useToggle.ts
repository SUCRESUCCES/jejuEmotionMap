import { useCallback, useState } from 'react';

export const useToggle = (initial = false) => {
  const [value, setValue] = useState<boolean>(initial);
  const open = useCallback(() => setValue(true), []);
  const close = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return { value, setValue, open, close, toggle } as const;
};

export default useToggle;
