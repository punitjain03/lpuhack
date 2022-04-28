import dis
from http.client import HTTPResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect
from MySQLdb import _mysql
import mysql.connector as sqltor
from numpy import number
import pandas as pd
# Create your views here.
def home(request):
    return render(request,'search.html')

def nsap(request):
    return redirect("http://stackoverflow.com/")

def search_person(request):
    name = request.GET['fname']
    state = request.GET['state']
    district = request.GET['Dname']
    father_name = request.GET['fhname']
    mycon = sqltor.connect(host="localhost",user="root",passwd="123",database="pensionersdetails")
    cursor = mycon.cursor()

    cursor.execute("SELECT COUNT(name) FROM names WHERE name = %s AND state = %s AND district = %s AND father_name = %s",(name,state,district,father_name))
    #, state = %s , district = %s , father_name = %s ,state,district,father_name) WHERE name = %s",(name,)
    sql_data1 = pd.DataFrame(cursor.fetchone())
    sql_data1.columns = cursor.column_names
    number=sql_data1.loc[0][0]
    print(number)
    if(number >= 1):
        return render(request,'result2.html')
    return render(request,'result.html')


