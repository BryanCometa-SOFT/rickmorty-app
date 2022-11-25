export interface Register {
    nombre:     string;
    apellido:   string;
    doctoIdent: string;
    email:      string;
    clave:      string;
    cia:        string;
}

export interface Login {
    password:  string;
    companyId: string;
    username:  string;
    desdeMs:   boolean;
}

export interface Token {
    usuario: any;
    token: string;
}
