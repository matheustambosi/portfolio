export interface Atletica {
    nome: string,
    situacao: number,
    universidade: string,
    cidade: string,
    estado: string
}

export interface Usuario {
    nome: string,
    email: string,
    tipoUsuario: number
}

export interface QRCode {
    descricao: string,
    duracaoDias: number
}

export interface Modalidade {
    descricao: string,
    buscandoAtletas: boolean
}

export interface BuscandoAtletas {
    codigoModalidade: string,
    descricao: string,
    inscrito: boolean
}