export interface Exame {
    _id: string;
    doutor_id: string;
    paciente_id: string;
    data: string;
    hora: string;
    doutor: {
        nome: string;
        especialidade: string;
    };
    paciente: {
        nome: string;
    };
}

export interface Doutor {
    _id: string;
    nome: string;
    especialidade: string;
}

export interface Paciente {
    _id: string;
    nome: string;
}