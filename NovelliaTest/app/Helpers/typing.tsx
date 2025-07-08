interface DogInfo {
    name: string,
    type: string,
    breed: string,
    DOB: string
}

interface VaccineInfo{
    name: string,
    date: string
}

interface AllergyInfo{
    name: string,
    reaction: string,
    severity: string
}

interface LabInfo{
    name: string,
    dosage: string,
    instructions: string
}

export type {DogInfo, VaccineInfo, AllergyInfo, LabInfo};