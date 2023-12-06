from flask import Flask, render_template, url_for, request, redirect, jsonify
import mysql.connector as dbapi # mysql


app = Flask(__name__)
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'password',
    'database': 'dummy',
    'port': 3306,
}

db_connection = dbapi.connect(**db_config) 
cursor = db_connection.cursor()
statement = """CREATE TABLE IF NOT EXISTS CARDS (
    ID SERIAL PRIMARY KEY,
    NAME VARCHAR(80),
    COLLECTION VARCHAR(80),
    VALUE INT,
    NUMBER INT
    )"""
cursor.execute(statement)
cursor.close()
db_connection.close()

@app.route('/')
def home():
    return render_template('home.html')
     
# Running app
@app.route('/card_form', methods=['GET', 'POST'])
def card_form():
    if request.method == 'POST':
        id = request.form['id']
        name = request.form['name']
        collection = request.form['collection']
        value = request.form['value']
        number = request.form['number']
        return redirect(url_for('add_card', id = id, name = name, collection = collection, value = value, number = number))
    else:
        return render_template('add.html')
@app.route('/add/<int:id>/<string:name>/<string:collection>/<int:value>/<int:number>')
def add_card(id,name,collection,value,number):
    db_connection = dbapi.connect(**db_config)
    cursor = db_connection.cursor()
    select_query = 'INSERT INTO CARDS VALUES(%s,%s,%s,%s,%s)'
    cursor.execute(select_query, (id,name,collection,value,number))
    db_connection.commit()
    cursor.close()
    db_connection.close()
    return redirect(url_for('card_form'))

@app.route("/get", methods=["GET"])
def get_cards():
    db_connection = dbapi.connect(**db_config)
    cursor = db_connection.cursor()
    select_query = 'SELECT * FROM CARDS '
    cursor.execute(select_query)
    cards = cursor.fetchall()
    return render_template("get.html", cards = cards)
@app.route("/delete", methods=['POST', 'GET'])
def delete():
    if request.method == 'POST':
        id = request.form['id']
        return redirect(url_for('delete_card', id = id))
    else:
        return render_template('delete.html')
@app.route('/delete/<int:id>')
def delete_card(id):
    db_connection = dbapi.connect(**db_config)
    cursor = db_connection.cursor()
    select_query = 'DELETE FROM CARDS WHERE ID = %s'
    cursor.execute(select_query, (id,))
    db_connection.commit()
    cursor.close()
    db_connection.close()
    return redirect(url_for('delete'))
@app.route("/update", methods=['POST', 'GET'])
def update():
    if request.method == 'POST':
        id = request.form['id']
        name = request.form['name']
        collection = request.form['collection']
        value = request.form['value']
        number = request.form['number']
        return redirect(url_for('update_card', id = id, name = name, collection = collection, value = value, number = number))
    else:
        return render_template('update.html')
@app.route('/update/<int:id>')
def update(id,name,collection,value,number):
    db_connection = dbapi.connect(**db_config)
    cursor = db_connection.cursor()
    select_query = 'UPDATE CARDS SET NAME = %s, COLLECTION = %s, VALUE = %s, NUMBER = %s WHERE ID = %s'
    cursor.execute(select_query, (name, collection, value, number, id))
    db_connection.commit()
    cursor.close()
    db_connection.close()
    return redirect(url_for('update'))
@app.route('/search', methods=['GET', 'POST'])
def search():
    if request.method == 'POST':
        name = request.form['name']
        return redirect(url_for('search_results', name = name))
    else:
        return render_template('search.html')

@app.route('/search_results/<string:name>', methods=['GET'])
def search_results(name):
    db_connection = dbapi.connect(**db_config)
    cursor = db_connection.cursor()
    select_query = 'SELECT * FROM CARDS WHERE NAME LIKE %s'
    cursor.execute(select_query, ('%' + name + '%',))
    cards = cursor.fetchall()
    cursor.close()
    db_connection.close()
    return render_template('get.html', cards = cards)

if __name__ == '__main__':
    app.run(debug=True)