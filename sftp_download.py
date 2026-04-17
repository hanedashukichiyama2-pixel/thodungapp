import paramiko
import sys
import json
import codecs

def download_file(host, port, user, password, remote_path, local_path):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(hostname=host, port=port, username=user, password=password)
        sftp = client.open_sftp()
        sftp.get(remote_path, local_path)
        sftp.close()
        print(json.dumps({'status': 'success'}))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
    finally:
        client.close()

if __name__ == '__main__':
    download_file("45.119.83.233", 22, "root", "nSmaPGEY39", sys.argv[1], sys.argv[2])
