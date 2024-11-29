import psycopg2
import pandas as pd

try:
    # пытаемся подключиться к базе данных
    conn = psycopg2.connect(dbname='root', user='root', password='root', host='localhost')
    conn.autocommit = True
except:
    # в случае сбоя подключения будет выведено сообщение в STDOUT
    print('Can`t establish connection to database')
    exit()

def create_dict(values:list)->dict:
    d = dict()
    for row in values:
        d[row[1]] = row[0]
    return d

def apply_filter(filter:dict, s: str) -> list[int]:
    s = s.split(',')
    mas = list()
    for c in s:
        mas.append(filter[c.strip()])
    return mas

def insert_Cases():
    with pd.ExcelFile(r"Cases.xls") as wb:
        # Filling Form Factors
        with conn.cursor() as curs:
            try:
                for value in wb.parse(1).values:
                    curs.execute(f"INSERT INTO Form_factor (Form_factor) VALUES ('{value[0]}')")
                print('Finish INSERT into Forms factors')
            except Exception as ex:
                print(ex)
        
        # Filling Cases
        with conn.cursor() as curs:
            curs.execute("SELECT * FROM Form_factor")
            filter = create_dict(curs.fetchall())
            try:
                for value in wb.parse(0).values:
                    curs.execute(f"INSERT INTO Body (img, Name, Price) VALUES ('{value[0]}', '{value[1]}', {value[3]})")
                    for socket in apply_filter(filter,value[2]):
                        curs.execute(f"INSERT INTO Body_form_factors (body_id, form_factor_id) VALUES ((SELECT MAX(Id) FROM Body), {socket})")
                print('Finish INSERT into Body')
            except Exception as ex:
                print(ex)


def insert_Cooling_system():
    with pd.ExcelFile(r"Cooling_system.xls") as wb:
        # Filling Sockets
        sheet = wb.parse(0)
        l = ''
        for value in sheet['Socket'].values:
            l+=value.replace('\xa0', ' ').replace(',', ' ')+' '
        unique_list = set([v.strip() for v in l.split(' ')])
        unique_list.remove('')
        with conn.cursor() as curs:
            try:
                for value in unique_list:
                    curs.execute(f"INSERT INTO Socket (Socket) VALUES ('{value}')")
                print('Finish INSERT into Sockets')
            except Exception as ex:
                print(ex)

               
        # Filling Systems
        with conn.cursor() as curs:
            curs.execute("SELECT * FROM Socket")
            filter = create_dict(curs.fetchall())
            try:
                for value in wb.parse(0).values:
                    curs.execute(f"INSERT INTO Cooling_system (img, Name, Cooling_system_type, Max_TDP, Price) VALUES ('{value[0]}', '{value[1]}', '{value[2]}', {value[3]}, {value[5]})")
                    for form_factor in apply_filter(filter,value[4]):
                        curs.execute(f"INSERT INTO Cooling_systems_sockets (cooling_system_id, socket_id) VALUES ((SELECT MAX(Id) FROM Cooling_system), {form_factor})")
                print('Finish INSERT into Cooling_system')
            except Exception as ex:
                print(ex)


def insert_CPUs():
    with pd.ExcelFile(r"CPUs.xls") as wb:
        # Filling CPUs
        with conn.cursor() as curs:
            curs.execute("SELECT * FROM Socket")
            filter = create_dict(curs.fetchall())
            try:
                for value in wb.parse(0).values:
                    curs.execute(f"INSERT INTO Processor (img, Name, Core_number, Frequency, TDP, Threads_number, Socket, Price) VALUES ('{value[0]}', '{value[1]}', {value[3]}, {float(value[5][:-3])}, {value[6]}, {value[4]}, {filter[value[2]]}, {value[7]})")
                print('Finish INSERT into Processor')
            except Exception as ex:
                print(ex)


def insert_Disks():
    with pd.ExcelFile(r"Disks.xls") as wb:
        # Filling Form Factors
        with conn.cursor() as curs:
            try:
                curs.execute(f"INSERT INTO Disk_type (Disk_type) VALUES ('SSD')")
                curs.execute(f"INSERT INTO Disk_type (Disk_type) VALUES ('HDD')")
                print('Finish INSERT into Disk type')
            except Exception as ex:
                print(ex)
        
        # Filling Cases
        with conn.cursor() as curs:
            try:
                for value in wb.parse(0).values:
                    curs.execute(f"INSERT INTO Disk (img, Name, Disk_type, Memory, Price) VALUES ('{value[0]}', '{value[1]}', {value[2]}, {value[3]}, {value[4]})")
                print('Finish INSERT Disk')
            except Exception as ex:
                print(ex)


def insert_RAM():
    with pd.ExcelFile(r"RAM.xls") as wb:
        # Filling Form Factors
        with conn.cursor() as curs:
            try:
                curs.execute(f"INSERT INTO Memory_type (Memory_type) VALUES ('DDR2')")
                curs.execute(f"INSERT INTO Memory_type (Memory_type) VALUES ('DDR3')")
                curs.execute(f"INSERT INTO Memory_type (Memory_type) VALUES ('DDR4')")
                curs.execute(f"INSERT INTO Memory_type (Memory_type) VALUES ('DDR5')")
                print('Finish INSERT into Memory type')
            except Exception as ex:
                print(ex)
        
        # Filling Cases
        with conn.cursor() as curs:
            curs.execute("SELECT * FROM Memory_type")
            filter = create_dict(curs.fetchall())
            try:
                for value in wb.parse(0).values:
                    curs.execute(f"INSERT INTO RAM (img, Name, Memory_type, Memory, Frequency, Price) VALUES ('{value[0]}', '{value[1]}', {filter[value[2]]}, {value[3]}, {value[4]}, {value[5]})")
                print('Finish INSERT into RAM')
            except Exception as ex:
                print(ex)


def insert_Power_unit():
    with pd.ExcelFile(r"Unit_blocks.xls") as wb:
        # Filling Form Factors
        with conn.cursor() as curs:
            try:
                curs.execute(f"INSERT INTO Power_unit_type (Power_unit_type) VALUES ('ATX')")
                curs.execute(f"INSERT INTO Power_unit_type (Power_unit_type) VALUES ('TFX')")
                curs.execute(f"INSERT INTO Power_unit_type (Power_unit_type) VALUES ('SFX')")
                print('Finish INSERT into Power_unit_tyoe')
            except Exception as ex:
                print(ex)
        
        # Filling Cases
        with conn.cursor() as curs:
            curs.execute("SELECT * FROM Power_unit_type")
            filter = create_dict(curs.fetchall())
            try:
                for value in wb.parse(0).values:
                    curs.execute(f"INSERT INTO Power_unit (img, Name, Power_unit_type, Power, Price) VALUES ('{value[0]}', '{value[1]}', {filter[value[2].strip()]}, {value[3]}, {value[4]})")
                print('Finish INSERT into Power_unit')
            except Exception as ex:
                print(ex) 


def insert_Videocard():
    with pd.ExcelFile(r"Videocards.xls") as wb:
        # Filling Form Factors
        with conn.cursor() as curs:
            try:
                curs.execute(f"INSERT INTO Videomemory_type (Videomemory_type) VALUES ('GDDR6')")
                curs.execute(f"INSERT INTO Videomemory_type (Videomemory_type) VALUES ('GDDR5')")
                curs.execute(f"INSERT INTO Videomemory_type (Videomemory_type) VALUES ('GDDR3')")
                curs.execute(f"INSERT INTO Videomemory_type (Videomemory_type) VALUES ('GDDR2')")
                curs.execute(f"INSERT INTO Videomemory_type (Videomemory_type) VALUES ('GDDR5X')")
                curs.execute(f"INSERT INTO Videomemory_type (Videomemory_type) VALUES ('GDDR6X')")
                print('Finish INSERT into Videomemory_type')
            except Exception as ex:
                print(ex)
        
        # Filling Cases
        with conn.cursor() as curs:
            curs.execute("SELECT * FROM Videomemory_type")
            filter = create_dict(curs.fetchall())
            try:
                for value in wb.parse(0).values:
                    curs.execute(f"INSERT INTO Videocard (img, Name, Videomemory, Videomemory_type, Frequency, Power, Price) VALUES ('{value[0]}', '{value[1]}', {value[2]}, {filter[value[3].strip()]}, {value[4]}, {value[5]}, {value[6]})")
                print('Finish INSERT into Videocards')
            except Exception as ex:
                print(ex) 


def insert_MotherBoard():
    with pd.ExcelFile(r"mboards.xls") as wb:
        # Filling Chipsets
        sheet = wb.parse(0)
        a = set()
        for value in sheet['Chipset'].values:
            a.add(value.strip())
        with conn.cursor() as curs:
            try:
                for value in a:
                    curs.execute(f"INSERT INTO Chipset (Chipset) VALUES ('{value}')")
                print('Finish INSERT into Chipsets')
            except Exception as ex:
                print(ex)

               
        # Filling Systems
        with conn.cursor() as curs:
            curs.execute("SELECT * FROM Socket")
            filter_Socket = create_dict(curs.fetchall())
            curs.execute("SELECT * FROM Chipset")
            filter_Chipset = create_dict(curs.fetchall())
            curs.execute("SELECT * FROM Memory_type")
            filter_Memory_type = create_dict(curs.fetchall())
            curs.execute("SELECT * FROM Form_factor")
            filter_Form_factor = create_dict(curs.fetchall())
            try:
                for value in wb.parse(0).values:
                    curs.execute(f"INSERT INTO Motherboard (img, Name, Chipset, Socket, Memory_type, Form_factor, Price) VALUES ('{value[0]}', '{value[1]}', {filter_Chipset[value[2]]}, {filter_Socket[value[3]]}, {filter_Memory_type[value[4]]}, {filter_Form_factor[value[5]]}, {value[6]})")
                print('Finish INSERT into Motherboard')
            except Exception as ex:
                print(ex)


if __name__=="__main__":
    insert_Cases()
    insert_Cooling_system()
    insert_CPUs()
    insert_Disks()
    insert_RAM()
    insert_Power_unit()
    insert_Videocard()
    insert_MotherBoard()
    
