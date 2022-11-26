export interface Register {
    name:     string;
    email:      string;
    password:    string;
}

export interface Login {
    password:  string;
    email:  string;
}

export interface Token {
    usuario: any;
    token: string;
}
