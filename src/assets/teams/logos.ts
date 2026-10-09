const modules = import.meta.glob<string>('./*/*.png', {
  eager: true,
  import: 'default',
});

//!Esta función funciona para importar todas las logos de los equipos de forma dinamica
//*y se usa en el componente PitchVisualMap.tsx para obtener la logo de un equipo
//*segun su nombre. Solo funciona con nombres exactos.
export const teamLogos: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [path.split('/').pop()?.replace(/\.png$/, '') ?? '', url])
);
export const getTeamLogo = (fileName: string): string | undefined => teamLogos[fileName];
