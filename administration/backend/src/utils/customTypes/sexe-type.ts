// Define the Nir type
export type Sexe = string & { readonly __sexe: unique symbol };

// Function to validate NIR using regex
export const estValideSexe = (sexe: string): sexe is Sexe => {
  const sexeRegex = /^HOMME|FEMME$/;
  return sexeRegex.test(sexe);
};

// Function to create a NIR type variable
// export const createNir = (sexe: string): Sexe => {
//   if (!estValideSexe(sexe)) {
//     throw new Error('Format de sexe invalide.');
//   }
//   return sexe as Sexe;
// };
