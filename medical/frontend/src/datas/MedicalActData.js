// Jeu de données d'acte médicaux provisoire avant raccordement au backEnd
export const medicalActData = [
    {
        id:1,
        service:'Cardiologie',
        nir:'104021730625478',
        date: '05/06/2024',
        intitule_acte: 'Echographie des tissus cardiaques',
        nom_medecin: 'Dr Cohen',
        description: 'Ventricule gauche léger dysfonctionnement. Cavité normale. Maintient des oreillettes ferme.'
    },
    {
        id:2,
        service:'Radiologie',
        nir:'104021730625478',
        date: '06/06/2024',
        intitule_acte: 'Radiologie des poumons',
        nom_medecin: 'Dr Seguin',
        description: 'Diaphragme gêné par une légère atrophie pulmonaire'
    },
    {
        id:3,
        service:'Cardiologie',
        nir:'104021730625478',
        date: '07/06/2024',
        intitule_acte: 'Test d\'effort log',
        nom_medecin: 'Dr Courvite',
        description: 'Test de résistance à l\'effort. Legère lesion de stade 2 sur le muscle ventricule droit. ' +
            'Bonne résistannce à la motée en charge sur tapis inncliniaise 15°. Bilan global en adéquation avec l\'âge du patient.'
    },
    {
        id:4,
        service:'Cardiologie',
        nir:'104021730625478',
        date: '08/06/2024',
        intitule_acte: 'Suivi annuel de prévention',
        nom_medecin: 'Dr Surlamin',
        description: 'Le patient se plaint d\'une gêne au repos, sesation de poids sur le coeur. Prise de mesures à l\'ECG ' +
            'révèle un souffle au coeur bénin ne nécessitant pas autres interventions.',
    },
    {
        id:5,
        service:'Chirurgie',
        nir:'141068078200557',
        date: '09/06/2024',
        intitule_acte: 'Opération de la main droite sans anésthésie',
        nom_medecin: 'Dr Maboul',
        description: 'Opération suite à une pénétration d\'un corps étranger dans la paume de la main, entre D3 et D4. Objet ' +
            'tranchant non oxydé retiré par opération locale sans anesthésie.',
    }
]