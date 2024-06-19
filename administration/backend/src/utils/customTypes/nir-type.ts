// Define the Nir type
export type Nir = string & { readonly __nir: unique symbol };

// Function to validate NIR using regex
export const estValideNir = (nir: string): nir is Nir => {
    const nirRegex = /^[12]\d{2}(0[1-9]|1[0-2])\d{2}(0[1-9]|[1-8]\d|9[0-5]|2A|2B)\d{3}\d{3}\d{2}$/;
    return nirRegex.test(nir);
}

// Function to create a NIR type variable
// export const createNir = (nir: string): Nir => {
//     if (!estValideNir(nir)) {
//         throw new Error('Format de NIR invalide');
//     }
//     return nir as Nir;
// }

