enum TipoUsuario {
    SemAtletica = 0,
    Universitario = 1,
    Representante = 2,
    Administrador = 3
}

export interface Routes {
    name: string,
    route: string,
    allRoles: boolean,
    roles: TipoUsuario[]
}

export const routes: Routes[] = [
    { name: "Eventos", route: "/eventos", allRoles: true, roles: [] },
    { name: "Entrar em uma Atlética", route: "/lerqrcode", allRoles: false, roles: [TipoUsuario.SemAtletica, TipoUsuario.Administrador] },
    { name: "Jogar pela Atlética", route: "atleta/quero-jogar", allRoles: false, roles: [TipoUsuario.Universitario, TipoUsuario.Administrador] },
    { name: "Atleticas", route: "/administrador/atleticas", allRoles: false, roles: [TipoUsuario.Administrador] },
    { name: "Usuários", route: "/atletica/usuarios", allRoles: false, roles: [TipoUsuario.Representante, TipoUsuario.Administrador] },
    { name: "Modalidades", route: "/atletica/modalidades", allRoles: false, roles: [TipoUsuario.Representante, TipoUsuario.Administrador] },
    { name: "Atletas", route: "/atletica/atletas", allRoles: false, roles: [TipoUsuario.Representante, TipoUsuario.Administrador] },
    { name: "QRCodes", route: "/atletica/qrcode", allRoles: false, roles: [TipoUsuario.Representante, TipoUsuario.Administrador] },
    { name: "Sair", route: "", allRoles: true, roles: [] }
]

export function getUserRoutes(tipoUsuario: any): Routes[] {
    return routes.filter(route => route.allRoles || route.roles.includes(tipoUsuario))
}