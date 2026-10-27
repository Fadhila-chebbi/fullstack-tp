
// Interface représentant un utilisateur
export interface User {
  id: number;
  nom: string;
  email: string;
}

// Liste des utilisateurs
export const users: User[] = [
  {
    id: 1,
    nom: 'Amine Ben Ali',
    email: 'amine@example.com',
  },
  {
    id: 2,
    nom: 'Sarra Trabelsi',
    email: 'sarra@example.com',
  },
  {
    id: 3,
    nom: 'Youssef Mansouri',
    email: 'youssef@example.com',
  },
];

// Générer automatiquement le prochain identifiant
export const getNextUserId = (): number => {
  return users.length > 0
    ? Math.max(...users.map((user) => user.id)) + 1
    : 1;
};
