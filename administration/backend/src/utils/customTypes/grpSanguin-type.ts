// Define the Nir type
export type GrpSanguin = string & { readonly __grpSanguin: unique symbol };

// Function to validate NIR using regex
export const estValideGrpSanguin = (grpSanguin: string): grpSanguin is GrpSanguin => {
    const grpSanguinRegex = /^(A|B|AB|O)[+-]$/;
    return grpSanguinRegex.test(grpSanguin);
}



// Function to create a NIR type variable
// export const createNir = (nir: string): GrpSanguin => {
//     if (!estValideGrpSanguin(nir)) {
//         throw new Error('Format de groupe sanguin invalide.');
//     }
//     return nir as GrpSanguin;
// }
