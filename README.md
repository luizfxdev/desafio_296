# 🚀 Rick & Morty - Calculadora de Rotas Interdimensionais

## 📊 Análise do Problema TSP (Traveling Salesman Problem)

### 🔍 **Conflito Identificado na Saída Esperada**

Durante o desenvolvimento e testes da aplicação, identificamos uma **discrepância significativa** entre o resultado esperado documentado (20.41) e o resultado matematicamente correto (28.97) para o exemplo fornecido.

---

## 📝 **Exemplos de Teste e Resultados**

### **Exemplo 1: Triângulo Simples**
```javascript
Entrada: [[0, 0], [3, 0], [0, 4]]
Resultado: 12.00 unidades
```
**Explicação:** Triângulo retângulo 3-4-5. Rota ótima: (0,0) → (3,0) → (0,4) → (0,0)
- Distâncias: 3.00 + 5.00 + 4.00 = 12.00 ✅

### **Exemplo 2: Quadrado Unitário**
```javascript
Entrada: [[0, 0], [1, 0], [1, 1], [0, 1]]
Resultado: 4.00 unidades
```
**Explicação:** Quadrado perfeito. Rota ótima: percorrer todas as bordas.
- Distâncias: 1.00 + 1.00 + 1.00 + 1.00 = 4.00 ✅

### **Exemplo 3: Pontos Alinhados**
```javascript
Entrada: [[0, 0], [1, 0], [2, 0], [3, 0]]
Resultado: 6.00 unidades
```
**Explicação:** Pontos em linha reta. Rota ótima: ir até o fim e voltar.
- Distâncias: 1.00 + 1.00 + 1.00 + 3.00 = 6.00 ✅

### **Exemplo Original (Problemático)**
```javascript
Entrada: [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]
Resultado Esperado: 20.41 ❌
Resultado Calculado: 28.97 ✅
```

---

## 🔬 **Análise Matemática Detalhada**

### **Cálculo Manual das Distâncias**

Para o exemplo `[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]`, calculamos todas as distâncias euclidianas:

```
Distâncias entre pares de pontos:
[0,0] ↔ [2,2] = 2.8284
[0,0] ↔ [3,10] = 10.4403  
[0,0] ↔ [5,2] = 5.3852
[0,0] ↔ [7,0] = 7.0000
[2,2] ↔ [3,10] = 8.0623
[2,2] ↔ [5,2] = 3.0000
[2,2] ↔ [7,0] = 5.3852
[3,10] ↔ [5,2] = 8.2462
[3,10] ↔ [7,0] = 10.7703
[5,2] ↔ [7,0] = 2.8284
```

### **Verificação da "Rota 20.41"**

A rota que teoricamente deveria dar 20.41:
```
(0,0) → (7,0) → (5,2) → (2,2) → (3,10) → (0,0)
7.0000 + 2.8284 + 3.0000 + 8.0623 + 10.4403 = 31.3310 ❌
```

### **Rota Ótima Real**

A rota ótima encontrada pelo algoritmo:
```
(0,0) → (2,2) → (5,2) → (7,0) → (3,10) → (0,0)
2.8284 + 3.0000 + 2.8284 + 10.7703 + 10.4403 = 28.9674 ✅
```

---

## ✅ **Conclusões**

### **1. Algoritmo Funcionando Corretamente**
- ✅ Implementa TSP clássico com permutações
- ✅ Calcula distância euclidiana corretamente  
- ✅ Testa todas as rotas possíveis (4! = 24 permutações)
- ✅ Inclui retorno à base na soma total

### **2. Discrepância na Documentação**
- ❌ **Resultado esperado 20.41 está incorreto**
- ✅ **Resultado correto é 28.97**
- 🔍 Possível erro de transcripção ou exemplo diferente

### **3. Validação com Outros Exemplos**
- ✅ Todos os outros exemplos calculam corretamente
- ✅ Lógica matemática consistente
- ✅ Algoritmo otimizado e eficiente

---

## 🎯 **Recomendação Final**

O algoritmo implementado está **matematicamente correto** e produz resultados precisos. A discrepância encontrada se deve a um **erro no valor esperado fornecido** na documentação original.

**Resultado oficial:** `28.97 unidades` para a entrada `[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]`

---

## 🚀 **Características Técnicas**

- **Complexidade:** O(n!) para solução exata
- **Precisão:** Até 6 casas decimais
- **Validação:** Entrada e formato de coordenadas
- **Otimização:** Fixa origem para reduzir permutações
- **Interface:** Visual Rick & Morty theme

---

### 🧑🏾‍💻 Autor: [Luizfxdev](https://www.linkedin.com/in/luizfxdev) 

*"Sometimes science is more art than science, Morty. A lot of people don't get that."* - Rick Sanchez 🧪
