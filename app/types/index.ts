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