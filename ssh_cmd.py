import paramiko
import sys
import json

def run_command(host, port, user, password, command):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(hostname=host, port=port, username=user, password=password)
        stdin, stdout, stderr = client.exec_command(command)
        out = stdout.read().decode('utf-8', errors='replace')
        err = stderr.read().decode('utf-8', errors='replace')
        result = {'stdout': out, 'stderr': err}
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
    finally:
        client.close()

if __name__ == '__main__':
    command = " ".join(sys.argv[1:])
    run_command("45.119.83.233", 22, "root", "nSmaPGEY39", command)
