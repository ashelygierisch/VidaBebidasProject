import { usePathname } from 'next/navigation';

export function useActivePath(): (path: string) => boolean {
  const pathname = usePathname();

  const checkActivePath = (path: string) => {
    return path === pathname;
  };

  return checkActivePath;
}
