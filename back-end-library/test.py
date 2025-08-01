import requests

# URL da sua API FastAPI
API_URL = "http://localhost:8000/import"

# Dados a serem enviados
payload = [
    {
      "name": "Luiz",
      "email": "luiz@example.com",
      "login": "luiz",
      "books": [
        {
          "title": "Python Fluente",
          "author": "Luciano Ramalho"
        },
        {
          "title": "Automate the Boring Stuff",
          "author": "Al Sweigart"
        }
      ]
    },
    {
      "name": "pedro",
      "email": "pedro@example.com",
      "login": "pedro",
      "books": [
        {
          "title": "Clean Architecture",
          "author": "Robert C. Martin"
        }
      ]
    },
    {
      "name": "Jao Mendes",
      "email": "jao@example.com",
      "login": "jao",
      "books": []
    }
  ]
  

# Envia os dados via POST
response = requests.post(API_URL, json=payload)

# Exibe o resultado
if response.status_code == 200:
    print("Importação concluída com sucesso!")
    print(response.json())
else:
    print(f"Erro ao importar: {response.status_code}")
    print(response.text)
