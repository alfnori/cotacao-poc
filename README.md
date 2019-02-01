#Cotação POC

* Criação das telas conforme proposta do layout. Além do básico, foram adicionados algumas funções extras como animações e transições,
um menu simples, com login e logout fake, validação do campo de CNPJ, bem como os indicadores de válido ou inválido(remoção),
além do uso de toast e modal para demonstrar o serviço, que está bem "documentado" via console.
* Algumas informaçõe importantes:
  + O avatar do usuário abre um menu simples para navegação e alteração das instâncias. Sair faŕa o logout e
  irá voltar para a Home. Emular sessão irá fazer um login fake entre dois perfis randomicamente. E emular perda de sessão 
  irá apenas invalidar o usuário sem redirecionamento(para ser utilizado no teste da busca e retornar erro).
  + Os dados de teste estão do arquivo /data/sampleData. Foi utilização uma biblioteca para emular requisições ajax. Para retornar 
  ao front era preciso um código 200, mas o serviço retornar erros com 404, no caso de não encontrar empresa, ou então 401 ou 403
  se o usuário não estiver autenticado(pode ser emulada a sessão no menu - avatar).
  + Para o teste do cnpj utilizar 12345678000123 (possui máscara o campo). Este CNPJ retorna um dado fake. Também irá abrir um modal 
  simples com os dados obtidos. Existem mais dois CNPJs válidos no arquivo de dados.
  + Para testar o erro, enviar qualquer CNPJ válido ois o campo valida o mesmo para liberar o botão OK.
  

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Some advice

#### Test configuration for Linux:

If you got some errors about watcher (or like error recursive-readdir/test/testdir/b/b ENOSPC) when running tests try to execute in terminal:

### `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

#### Running Jest:
-u updates snaps, --coverage to update % --silent without console.log
### `jest -u --coverage --silent`




