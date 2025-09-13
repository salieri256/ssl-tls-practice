# ヴィジュネル暗号

## 使い方

### 暗号化

```bash
node encrypt.ts PLAIN_TEXT KEY
```

|||
|-|-|
|`PLAIN_TEXT`|平文|
|`KEY`|鍵|

### 復号

```bash
node decrypt.ts CIIPHER_TEXT KEY
```

|||
|-|-|
|`CIPHER_TEXT`|暗号文|
|`KEY`|鍵|

## 実行例

```
node encrypt.ts connect yufxbxp
aiskfzi
```

```
node decrypt.ts aiskfzi yufxbxp
connect
```
