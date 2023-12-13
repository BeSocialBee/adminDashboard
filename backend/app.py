from flask import Flask, render_template, url_for, request, redirect, jsonify
import mysql.connector as dbapi # mysql
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
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

@app.route('/add', methods=['POST'])
def add_card():
    try:
        name = request.form.get('name')
        collection = request.form.get('collection')
        value = request.form.get('value')
        number = request.form.get('number')

        db_connection = dbapi.connect(**db_config)
        cursor = db_connection.cursor()
        select_query = 'INSERT INTO CARDS (NAME, COLLECTION, VALUE, NUMBER) VALUES (%s, %s, %s, %s)'
        cursor.execute(select_query, (name, collection, value, number))
        db_connection.commit()
        cursor.close()
        db_connection.close()

        return jsonify(message='Card added successfully')

    except Exception as e:
        return jsonify(error=str(e))

@app.route("/get", methods=["GET"])
def get_cards():
    db_connection = dbapi.connect(**db_config)
    cursor = db_connection.cursor()
    select_query = 'SELECT * FROM CARDS '
    cursor.execute(select_query)
    cards = cursor.fetchall()
    result = []
    for card in cards:
        result.append({
            'id': card[0],
            'name': card[1],
            'collection': card[2], 
            'value': card[3],
            'number': card[4],
        })
    return jsonify(cards = result)
@app.route("/get/<int:id>", methods=["GET"])
def get_card_by_id(id):
    try:
        db_connection = dbapi.connect(**db_config)
        cursor = db_connection.cursor()

        # Select a card by its ID
        select_query = 'SELECT * FROM CARDS WHERE ID = %s'
        cursor.execute(select_query, (id,))
        card = cursor.fetchone()
        if card:
            result = [{
                'id': card[0],
                'name': card[1],
                'collection': card[2], 
                'value': card[3],
                'number': card[4],
            }]
            return jsonify(card=result)
        else:
            return jsonify(message=f'Card with ID {id} not found'), 404

    except Exception as e:
        return jsonify(error=str(e)), 500
    
@app.route('/delete/<int:id>', methods = ["DELETE"])
def delete_card(id):
    db_connection = dbapi.connect(**db_config)
    cursor = db_connection.cursor()
    select_query = 'DELETE FROM CARDS WHERE ID = %s'
    cursor.execute(select_query, (id,))
    db_connection.commit()
    cursor.close()
    db_connection.close()
    return jsonify(message=f'Card with ID {id} deleted successfully')

@app.route('/update/<int:id>',  methods=['PUT'])
def update_card(id):
    data = request.json
    name = data.get('name')
    collection = data.get('collection')
    value = data.get('value')
    number = data.get('number')
    db_connection = dbapi.connect(**db_config)
    cursor = db_connection.cursor()
    select_query = 'UPDATE CARDS SET NAME = %s, COLLECTION = %s, VALUE = %s, NUMBER = %s WHERE ID = %s'
    cursor.execute(select_query, (name, collection, value, number, id))
    db_connection.commit()
    cursor.close()
    db_connection.close()
    return jsonify(message=f'Card with ID {id} updated successfully')

@app.route('/search_results/<string:name>', methods=['GET'])
def search_results(name):
    db_connection = dbapi.connect(**db_config)
    cursor = db_connection.cursor()
    select_query = 'SELECT * FROM CARDS WHERE NAME LIKE %s'
    cursor.execute(select_query, ('%' + name + '%',))
    cards = cursor.fetchall()
    cursor.close()
    db_connection.close()
    result = []
    for card in cards:
        result.append({
            'id': card[0],
            'name': card[1],
            'collection': card[2],
            'value': card[3],
            'number': card[4],
        })

    return jsonify(cards=result)

if __name__ == '__main__':
    app.run(debug=True)