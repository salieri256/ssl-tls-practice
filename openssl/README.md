# OpenSSLの検証環境

```bash
docker build -t OPENSSL .
```

```bash
docker run -it --name ssl-tls-practice-openssl OPENSSL
```

>[!NOTE]
> ```
> docker: Error response from daemon: failed to create task for container: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: error during container init: exec: "/home/openssl/init.sh": permission denied: unknown
> 
> Run 'docker run --help' for more information
> ```
> 上記のエラーが出た場合は，ローカルファイルの実行権限がない可能性がある．
> 以下のコマンドで，ローカルファイルに実行権限を付与してからビルドする．
> ```bash
> chmod +x init.sh
> ```
