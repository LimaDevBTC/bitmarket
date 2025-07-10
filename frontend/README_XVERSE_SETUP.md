# 🔗 Integração Xverse - Guia Completo

## 📋 Pré-requisitos

### 1. Extensão Xverse
- ✅ Instalar a extensão Xverse no navegador
- ✅ Configurar uma carteira (criar ou importar)
- ✅ Desbloquear a carteira
- ✅ Verificar se a extensão está ativa

### 2. Configuração da Rede
A Xverse suporta várias redes. Para o BitMarket.bet, recomendamos:
- **Mainnet** (padrão) - Para uso em produção e testes reais
- **Testnet** - Para desenvolvimento e testes sem custo

## 🔧 Troubleshooting Detalhado

### Problema 1: "Conexão cancelada"
**Sintomas:**
- A extensão Xverse não aparece
- O usuário cancela a conexão
- Erro "Conexão cancelada"

**Soluções:**
1. **Verificar se a extensão está ativa:**
   - Abra o painel de extensões do navegador
   - Certifique-se de que a Xverse está habilitada
   - Verifique se não há bloqueios de popup

2. **Desbloquear a carteira:**
   - Abra a extensão Xverse manualmente
   - Digite sua senha para desbloquear
   - Mantenha a carteira desbloqueada

3. **Verificar permissões:**
   - Clique com o botão direito na extensão
   - Verifique se tem permissão para acessar o site
   - Permita acesso se necessário

### Problema 2: "Timeout"
**Sintomas:**
- A conexão demora mais de 30 segundos
- Erro "Timeout: A Xverse não respondeu"

**Soluções:**
1. **Verificar configuração da rede:**
   - Na Xverse: Configurações → Rede
   - Configure para **Mainnet** (recomendado) ou **Testnet**
   - Certifique-se de que a rede está ativa

2. **Reiniciar a extensão:**
   - Desabilite e reabilite a extensão
   - Recarregue a página (F5)
   - Tente conectar novamente

3. **Verificar conexão de internet:**
   - Certifique-se de que a internet está funcionando
   - Tente acessar outros sites

### Problema 3: "Função getAddress não encontrada"
**Sintomas:**
- Erro no console sobre getAddress
- sats-connect não está funcionando

**Soluções:**
1. **Verificar instalação do sats-connect:**
   ```bash
   cd frontend
   npm list sats-connect
   ```
   Deve mostrar: `sats-connect@1.4.1`

2. **Reinstalar dependências:**
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Verificar versão do Node.js:**
   ```bash
   node --version
   ```
   Recomendado: Node.js 18+ ou 20+

### Problema 4: "BitcoinProvider não encontrado"
**Sintomas:**
- Console mostra "BitcoinProvider não encontrado"
- A extensão Xverse não está sendo detectada

**Soluções:**
1. **Verificar se a Xverse está instalada:**
   - Acesse: https://www.xverse.app/
   - Instale a extensão oficial
   - Certifique-se de que é a versão mais recente

2. **Verificar compatibilidade do navegador:**
   - Chrome/Chromium: ✅ Suportado
   - Firefox: ✅ Suportado
   - Safari: ⚠️ Pode ter problemas
   - Edge: ✅ Suportado

3. **Verificar se não há conflitos:**
   - Desabilite outras extensões de carteira
   - Teste em modo incógnito
   - Verifique se não há bloqueadores de anúncios interferindo

## 🧪 Testes de Diagnóstico

### Teste 1: Verificação Básica
1. Abra o console do navegador (F12)
2. Clique em "🧪 Teste Simples (Console)"
3. Verifique os logs no console

**Resultados esperados:**
```
🧪 Teste simples do sats-connect
🔍 window.BitcoinProvider: [object Object]
🔍 typeof getAddress: function
🔍 getAddress: function getAddress(config) { ... }
```

### Teste 2: Teste de Rede Mainnet
1. Clique em "🌐 Teste Mainnet"
2. Aguarde até 10 segundos
3. Verifique se a Xverse aparece

**Se funcionar:** O problema é com a configuração da Testnet
**Se não funcionar:** O problema é mais fundamental

### Teste 3: Logs Detalhados
1. Clique em "Conectar Xverse"
2. Observe os logs no console
3. Identifique onde o processo falha

## 🔄 Processo de Conexão

### Fluxo Normal:
1. **Inicialização:** Verifica ambiente e dependências
2. **Detecção:** Procura pela extensão Xverse
3. **Chamada:** Executa getAddress com parâmetros
4. **Aguardar:** Aguarda resposta da extensão (até 30s)
5. **Processar:** Extrai endereços da resposta
6. **Conectar:** Atualiza estado da aplicação

### Pontos de Falha Comuns:
- ❌ Extensão não instalada
- ❌ Carteira bloqueada
- ❌ Rede incorreta
- ❌ Popup bloqueado
- ❌ Timeout da extensão
- ❌ Conflito com outras extensões

## 📞 Suporte

Se os problemas persistirem:

1. **Coletar informações:**
   - Screenshot do erro
   - Logs do console
   - Versão do navegador
   - Versão da Xverse

2. **Verificar documentação oficial:**
   - https://docs.xverse.app/
   - https://github.com/secretkeylabs/sats-connect

3. **Testar em ambiente limpo:**
   - Modo incógnito
   - Navegador diferente
   - Dispositivo diferente

## 🎯 Dicas Importantes

- **Sempre desbloqueie a carteira** antes de tentar conectar
- **Use Testnet** para desenvolvimento e testes
- **Mantenha a Xverse atualizada**
- **Verifique o console** para logs detalhados
- **Teste em modo incógnito** para isolar problemas
- **Reinicie o navegador** se necessário

---

**Última atualização:** 21/06/2025
**Versão do sats-connect:** 1.4.1
**Status:** ✅ Funcionando 