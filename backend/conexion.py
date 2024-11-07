
from neo4j import GraphDatabase



class Database():
    def __init__(self):
        self._URI ="neo4j+s://fe7d6385.databases.neo4j.io"
        self._User = "neo4j"
        self._Password = "zU-8G6lTE41cmwwx8f0uoi3R1FMMkaY9vDQg1DCPm3E"
        self._driver = GraphDatabase.driver(self._URI,auth = (self._User,self._Password))

    def execute_query(self,query,parameters=None):
        with self._driver.session() as session:
            result = session.run(query,parameters)
            return result.data()

    #MANEJO DE USUARIOS

    def create_user(self, username, name, lastname, email, password):

        verify_user = """
             MATCH (u:User)
            WHERE u.username = $username OR u.email = $email
            RETURN u
        """
        verify_paramaters = {
                'username':username,
                'email':email
                }
        existing_user = self.execute_query(verify_user,verify_paramaters)
        
        if existing_user:
            # Si ya existe un usuario con el mismo username o email
            return True        
        else:
            query = """
                CREATE (u:User {username: $username, name: $name,
                                lastname: $lastname, email: $email,
                                password: $password})
            """
            parameters = {
                'username': username,
                'name': name,
                'lastname': lastname,
                'email': email,
                'password': password
            }
            self.execute_query(query, parameters) 
            return False 
    
    def delete_user(self,name):
        query = """
            MATCH (u:User {name:$name})
            DELETE u

        """
        parameters = {
                'name':name
                }
        return self.execute_query(query,parameters)

    def login_user(self,username,password):
        verify_user = """
            MATCH (u:User {username:$username})
            RETURN u

        """
        verify_parameters = {
                'username':username
                }
        existing_user = self.execute_query(verify_user,verify_parameters)
        if existing_user:
            verify_password = """
            MATCH (u:User {username:$username,password:$password})
            RETURN u

             """
            verify_auth = {
                    'username':username,
                    'password':password
                    }
            correct_password = self.execute_query(verify_password,verify_auth)
            if correct_password:
                return self.execute_query(verify_password,verify_auth)

            else:
                return False
        else:
            return False

     
       


    def read_users(self):
        query = """
            MATCH (u:User) RETURN u
        """
        return self.execute_query(query)
    
    #MANEJO DE POST
    
    def create_post(self,title,content,autor,timestamp):
        query = """
            CREATE (p:Post {title: $title,content: $content,autor:$autor,timestamp:$timestamp}) 
        """
        parameters = {
                'title':title,
                'content':content,
                'autor':autor,
                'timestamp':timestamp
                }
        return self.execute_query(query,parameters)

    def delete_post(self,autor):
        query = """
            MATCH (p:Post {autor:$autor})
            DELETE u

        """
        parameters = {
                'autor':autor
                }
        return self.execute_query(query,parameters)



    def read_posts(self):
        query = """
            MATCH (p:Post) RETURN p
        """
        return self.execute_query(query)
    
    #MANEJO DE COMENTARIOS

    def create_comment(self,autor,content,timestamp):
        query = """
            CREATE (c:Comment {autor: $autor,content: $content,autor:$autor,timestamp:$timestamp}) 
        """
        parameters = {
                'autor':autor,
                'content':content,
                'timestamp':timestamp
                }
        return self.execute_query(query,parameters)

    def delete_comment(self,autor):
        query = """
            MATCH (c:Comment {autor:$autor})
            DELETE c

        """
        parameters = {
                'autor':autor
                }
        return self.execute_query(query,parameters)



    def read_comments(self):
        query = """
            MATCH (c:Comment) RETURN c
        """
        return self.execute_query(query)



hola = Database()
#hola.create_user('flaviongas','flavio','flores','flavio@gmail.com','2024/11/04','1234')
#hola.delete_user('ricardo')
#hola.create_post('hola mundo','chao mundo','flavio','2024/11/04')
#hola.create_comment('flavio','hola no soy el flavio xd','2024/11/04')
hola.delete_user('flavio')
print(hola.read_users())
