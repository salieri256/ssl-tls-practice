# ARCFOUR

## 使い方

### 暗号化

```bash
node encrypt.ts PLAINTEXT KEY
```

|||
|-|-|
|`PLAINTEXT`|平文|
|`KEY`|鍵|

### 復号

```bash
node decrypt.ts CIIPHERTEXT KEY
```

|||
|-|-|
|`CIPHERTEXT`|暗号文|
|`KEY`|鍵|

## 実行例

```
node encrypt.ts connect yufxbxp
853f321aecf880
```

```
node decrypt.ts 853f321aecf880 yufxbxp
connect
```

## 概要

ARCFOURはストリーム暗号の一つです．

ARCFOURは2つの機能で構成されています．

- KSA (Key-scheduling algorithm．鍵スケジューリングアルゴリズム)
- PRGA (Pseudo-random generation algorithm．疑似乱数生成アルゴリズム)

計算量が少なく，高速に暗号化・復号できます．
