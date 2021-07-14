#coding:utf-8
import csv

with open('../data/SFPD_Incidents.csv','rb') as csvfile:
    reader = csv.reader(csvfile)
    rows= [row for row in reader]
# name = rows[0]
del rows[0:1]
arr = []
final_arr = []

for each in rows:
	item = (each[6],each[1]);
	arr.append(item)

myset = set(arr) 
for setitem in myset:
	tup1 = (arr.count(setitem),)
	setitem = setitem + tup1
	final_arr.append(setitem)

print final_arr

csvfile2 = file('../data/PdDistrictCatogorySet.csv', 'wb')
writer = csv.writer(csvfile2)
writer.writerow(['PdDistrict','Catogory','number'])

writer.writerows(final_arr)

csvfile.close()