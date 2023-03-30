
"""
Install flask:

pip install flask
or
pip3 install flask

--------------------------------------

Try running (at a command prompt):

flask run -h localhost -p 3000

or 

python -m flask run -h localhost -p 3000

or

python3 -m flask run -h localhost -p 3000

--------------------------------------

Very helpful auto-reload environment variable!
At yoour command prompt, paste

for Mac/Linux:

    export FLASK_DEBUG=1


for Windows:

    set FLASK_DEBUG=1

--------------------------------------

These next two are default. Nothing to do or see here!
But, for the record, here are the defaults:

Mac:
    export FLASK_APP=app.py
    export FLASK_ENV=development
Win:
    set FLASK_APP=app.py
    set FLASK_ENV=development

"""



# Importing the flask module is required, naturally:
from flask import Flask

# the request object lets us see the strings we're sent:
from flask import request
 
# The app is an object of type Flask. It needs the current module as input:
app = Flask(__name__)
 
# route is a Python "decorator":  
# It tells the app which url should call which function.
# 
# Here, accessing the root '/' url will call the hello_world() function:
@app.route('/')
def hello_world():
    print("Hi from inside flask!")    # Find this line!
    html = 'Hello, World!!!'          # Finding this line is easier:
    return html


#
# Notice that the function just returns a string.
#
# It ALWAYS just returns a string!
#    (The web is just passing around strings.)
#


#
# Task #1: Part A:  Change the above string to a string of your own. Reload!
#          Part B:  Actually use some HTML! :-)
#


#
# Task #2: Part A:  Use ngrok to open up your app to the world!   https://ngrok.com/
#                   Signup for the free version. Download!
#                   Run    ./ngrok config add-authtoken YOUR_AUTH_TOKEN
#                   then   ./ngrok http 3000
#                   and you'll see your globally accessible url. 
#                   Warning: It's global!
#          Part B:  Send the group your url and try out everyone else's!
#                   Afterward, be sure to turn off/control-c ngrok, so it's not globally available.
#
 


#
# That's it!   You're a full-stack developer.  
#              really, a "SaaS" developer: Software-as-a-Service,
#                      meaning "strings in - strings out"
#


#
# Now, the fun begins...
#


#
# try    http://localhost:3000/fun?x=42&y=9001&z=zebra&w=webb
#
#     Notice the ? that begins the input list, it's not part of the base url.
#     Notice the & between each "assignment" of the value (string) to each key (variable)
#



# Here, the '/fun' URL is bound to the fun() function.
@app.route('/fun', methods=['GET'])
def fun():
    L = []
    L.append("+++ start of inputs:")  # the ?-carried data
    n = 0
    for k in request.args:            # k is the next key
        v = request.args[k]           # v is the (string) value
        n += int(v)
        print("[in flask] key:value pair found:", k, v)
        s = f"k:v is {k}:{v}"  
        L.append(s)
    L.append("+++ end of inputs:")

    html_data_as_string = "\n".join(L)
    html = f"""
<html>
<body>

The inputs are <br><br> 

<code>
<pre>
{html_data_as_string}
{n}
</pre>
</code>

</body>
</html>
    """
    return html



#
# Task #3: Part A:  Change the above so that it does something with the inputs!
#                   Max? Min? Average? Factorial? ... something "fun" 
#          Part B:  Re-ngrok and share yours + try out three others
#






#
# an iris model!
#
from random import choice

def iris_model( sepallen, sepalwid, petallen, petalwid ):
    """ returns the best-guess of the species """
    if petalwid < 1.0:
        return "setosa"
    else:
        return choice(["versicolor","virginica"])
    

#
# try     http://localhost:3000/flower
# and
#         http://localhost:3000/flower?petalwid=42.0
# and
#         http://localhost:3000/flower?petalwid=0.42
#


# Here, the '/flower' URL is bound to the flower() function.
@app.route('/flower', methods=['GET'])
def flower():
    d = {}
    d["sepallen"] = 0.0
    d["sepalwid"] = 0.0
    d["petallen"] = 0.0
    d["petalwid"] = 0.0

    # get input values 
    for k in request.args:
        v = request.args[k]
        print("[in flask] key:value pair found:", k, v)
        try:
            d[k] = float(v)  # should be a float!
        except:
            d[k] = 0.0       # our default float

    # Let's use our model!
    predicted_species = iris_model( d["sepallen"], d["sepalwid"], d["petallen"], d["petalwid"] )
    
    html = f"""
<html>
<body>

The inputs were <br>
<code>
<pre>
{d}
</pre>
</code>

<br>
The predicted species is <font size="+2" color="dodgerblue"><b>{predicted_species}</b></font>

</body>
</html>
    """
    return html



#
# Task #4: Part A:  Change the above so that it is a model of something realler:
#                   how about water's state, based on temperature?
#                   how about your need for coffee, based on hour-of-day?
#                   how about your desired spiciness level of chicken, based on hunger?
#                   or, a "real" iris model! (see Task #5)
#          Part B:  Re-ngrok and share yours + try out three others
#


#
# Task #5: [Multi-week task!]
#          + Create your own model...
#          + make sure it works in Python locally
#          + add it to a page
#          + ngrok it!
#


# Still to cover:
#          + sending large quantities of data (POST, files)
#          + obtaining data in the background (asynchronous javascript)
#          + different javascript frameworks and how they do things (up to you)

# Not needed, but available as opportunities:
#          + flask templates (instead of large, awkward strings!)
#          + not needed, because we will probably focus on plain strings instead, SaaS-style
#          + how to include a favicon?!!





# The main "function" that runs the app.  (It's not actually a function.)
#
# If you use external hosting, e.g., PythonAnywhere, the app object is called differently.
#
# This if statement guards against it being run when not needed:
if __name__ == '__main__':
    # run() method of Flask class runs the application locally
    app.run()