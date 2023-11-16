export class UsuarioComponent {
  static generatePassword(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    // const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let senha = '';
    let temSimbolo = false;
    let temMaiuscula = false;
    let temNumero = false;

    while (senha.length < 8 || !temSimbolo || !temMaiuscula || !temNumero) {
      senha = '';
      temSimbolo = false;
      temMaiuscula = false;
      temNumero = false;

      for (let i = 0; i < 8; i++) {
        const char = caracteres[Math.floor(Math.random() * caracteres.length)];
        senha += char;

        if (!temSimbolo && '!@#$%^&*()_+-='.includes(char)) {
          temSimbolo = true;
        }

        if (!temMaiuscula && /[A-Z]/.test(char)) {
          temMaiuscula = true;
        }

        if (!temNumero && /[0-9]/.test(char)) {
          temNumero = true;
        }
      }
    }

    return senha;
  }
}
