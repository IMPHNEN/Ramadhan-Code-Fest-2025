# CMS Daftar Project untuk Web Portfolio

Aplikasi CMS yang berfungsi untuk mengelola daftar project yang akan 
ditampilkan pada web portfolio. Dengan aplikasi ini, pengguna dapat menambah, mengedit, 
menghapus, dan melihat daftar project secara dinamis
## Panduan Setup Project

1. Setup Environment Variables

    Buat file `.env` di root directory project Anda, lalu isi dengan variabel berikut
    sesuai dengan credential database PostgreSQL Anda:
    ```env
        PGHOST=HOST_DATABASE
        PGUSER=USERNAME_DATABASE
        PGPASSWORD=PASSWORD_DATABASE
        PGPORT=PORT_DATABASE
        PGDBNAME=NAMA_DATABASE
    ```

2. Install Dependency

    ```
    go mod download
    ```
3. Build atau Run Project

    * Untuk menjalankan project tanpa build:
        ```
        go run main.go
        ```

    * Untuk build project:
        ```
        go build
        ```
    * Untuk menjalankan project yang sudah dibuild:

        pada command prompt windows:
        ```
        ./porto-project.exe
        ```

## Endpoint API

- **GET /api/projects/?last_int_id=number**

    Menampilkan semua project yang ada
    * query
        - last_int_id
            
            nilai intId dari project pada index terakhir digunakan untuk paginasi. Gunakan 0 untuk page pertama
    * Response Body
    ```
        {
            "status": "Success",
            "message": "Projects fetched",
            "lastIntId": 9,
            "projects": [
                {
                    "id": "__YrSl_UjB-geSdNPXXr0",
                    "name": "test-data",
                    "description": "test-description",
                    "imageUrl": "test-url",
                    "intId": 1
                },
                ...,
                {
                    "id": "TctLOa5HlPMADaphVqQQP",
                    "name": "test-data",
                    "description": "test-description",
                    "imageUrl": "./uploads/picture-large.jpg",
                    "intId": 9
                }
            ]
        }
    ```
- **POST /api/projects**

    Membuat project baru
    * Request Body (form-data)
        | **Key**       | **Data**        | **Keterangan**                                                   |
        |---------------|-----------------|------------------------------------------------------------------|
        | `name`        | `text`          | Nama project                                                     |
        | `description` | `text`          | Deskripsi project                                                |
        | `image`       | `file`          | Gambar atau screenshot project dalam format jpg, jpeg, atau png  |

    * Response Body
- **GET /api/projects/:id**

    Menampilkan data project berdasarkan Id
    * Response Body
        ``` 
        {
            "status": "Success",
            "message": "Fetched project with Id: project_waJFg10F3Ewmh2jvL2H0_",
            "project": {
                "id": "project_waJFg10F3Ewmh2jvL2H0_",
                "name": "Proper Name",
                "description": "Very Proper Descriprion",
                "imageUrl": "/api/projects/images/file.png",
                "intId": 0
            }
        }
        ```

- **PUT /api/projects/:id**

    Memperbarui data project berdasarkan Id
    * Request Body (form-data)
        | **Key**       | **Data**        | **Keterangan**                  |
        |---------------|-----------------|---------------------------------|
        | `name`        | `text`          | Nama project                    |
        | `description` | `text`          | Deskripsi project               |
        | `image`       | `file`          | Gambar atau screenshot project  |
    * Response Body
    ```
        {
            "status": "Success",
            "message": "Updated project project_AtOLDMfv8Y5yDiAAEB6Jt",
            "project": {
                "id": "project_AtOLDMfv8Y5yDiAAEB6Jt",
                "name": "dasdoid",
                "description": "Very 123123Descriprion112",
                "imageUrl": "/api/projects/images/file.png",
                "intId": 0
            }
        }
    ```
- **DELETE /api/projects/:id**

    Menghapus data project berdasarkan Id
    * Response Body
        ```
        {
            "status": "Success",
            "message": "Project deleted"
        }
        ```

# Aplikasi masih rawan bug!
