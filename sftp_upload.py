import paramiko
import sys
import json

def upload_file(host, port, user, password, local_path, remote_path):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(hostname=host, port=port, username=user, password=password)
        sftp = client.open_sftp()
        sftp.put(local_path, remote_path)
        sftp.close()
        print(json.dumps({'status': 'success'}))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
    finally:
        client.close()

if __name__ == '__main__':
    upload_file("45.119.83.233", 22, "root", "nSmaPGEY39", sys.argv[1], sys.argv[2])
