# Regras de Negócio para o App de Gerenciamento de Quartos de Pousada/Hotel

## Funcionalidades Principais

### Login de Funcionário/Recepcionista

- **Descrição**: Funcionários e recepcionistas devem ser capazes de fazer login no sistema.
- **Regras**:
  - O login deve ser feito com um nome de usuário e senha.
  - Funcionários com o papel de "admin" terão permissões adicionais.
  - O sistema deve suportar recuperação de senha.

### Check-in/Check-out de Quartos

- **Descrição**: Funcionários devem ser capazes de realizar o check-in e check-out dos hóspedes nos quartos.
- **Regras**:
  - O funcionário deve selecionar o quarto e o hóspede para realizar o check-in.
  - O funcionário deve atualizar o status do quarto para "ocupado" durante o check-in.
  - O funcionário deve atualizar o status do quarto para "disponível" durante o check-out.
  - O sistema deve registrar a data e hora do check-in e check-out.
  - O sistema deve permitir a visualização do histórico de check-ins e check-outs.

### Criação de Quartos (Apenas para Admins)

- **Descrição**: Administradores devem ser capazes de criar novos quartos no sistema.
- **Regras**:
  - O administrador deve fornecer as seguintes informações ao criar um quarto:
    - Tipo de cama (ex: solteiro, casal, queen, king)
    - Número de camas
    - Status inicial do quarto (ex: disponível, em manutenção)
    - Descrição do quarto
    - Preço por noite
  - O administrador pode editar ou excluir quartos existentes.
  - O sistema deve permitir a visualização de todos os quartos e seus status.

### Tipos de Quartos

- **Descrição**: Definição dos tipos de quartos disponíveis.
- **Regras**:
  - Tipos de cama disponíveis:
    - Solteiro
    - Casal
    - Queen
    - King
  - Cada quarto deve ter um número de camas especificado.
  - Cada quarto deve ter um status inicial (ex: disponível, em manutenção).
  - O sistema deve permitir a adição de novos tipos de quartos.

### Status dos Quartos

- **Descrição**: Definição dos possíveis status dos quartos.
- **Regras**:
  - Status possíveis:
    - Disponível
    - Ocupado
    - Em manutenção
    - Reservado
  - O sistema deve permitir a atualização do status dos quartos.

### Gerenciamento de Hóspedes

- **Descrição**: Funcionários devem ser capazes de gerenciar informações dos hóspedes.
- **Regras**:
  - O funcionário deve ser capaz de adicionar, editar e remover informações dos hóspedes.
  - Informações dos hóspedes incluem:
    - Nome
    - Documento de identificação
    - Data de nascimento
    - Contato (telefone, email)
    - Histórico de estadias

### Reservas de Quartos

- **Descrição**: Funcionários devem ser capazes de gerenciar reservas de quartos.
- **Regras**:
  - O funcionário deve ser capaz de criar, editar e cancelar reservas.
  - O sistema deve permitir a visualização de todas as reservas.
  - O sistema deve enviar notificações de confirmação de reserva por email.

### Relatórios e Estatísticas

- **Descrição**: O sistema deve gerar relatórios e estatísticas sobre a ocupação dos quartos e o desempenho do hotel.
- **Regras**:
  - Relatórios de ocupação diária, semanal e mensal.
  - Relatórios de receita.
  - Estatísticas de check-ins e check-outs.

## Considerações Finais

- **Segurança**: Todas as operações devem ser protegidas por autenticação e autorização.
- **Usabilidade**: A interface deve ser intuitiva e fácil de usar para os funcionários.
- **Manutenção**: O sistema deve ser fácil de manter e atualizar.
- **Escalabilidade**: O sistema deve ser capaz de lidar com um grande número de quartos e hóspedes.
- **Backup e Recuperação**: O sistema deve ter mecanismos de backup e recuperação de dados.
