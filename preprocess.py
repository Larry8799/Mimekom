import csv

FILE_PATH = "data.csv"
TARGET_PATH = "js/data.js"
DATA = []
LABEL = ['Id', 'Title', 'Date', 'Thumbnail', 'Tags', 'Content']


def readfile():
    raw = list(csv.reader(open(FILE_PATH)))
    for row in raw[1:]:
        if row[3] == 'F':
            row[3] = 'false'
        else:
            row[3] = 'true'
        row[5] = row[5].replace("\n", "<br>").replace("\r", "")
        DATA.append(row)
        # print(row)


def output():
    f = open(TARGET_PATH, 'w+')
    f.write("var data = [\n")
    for row in DATA:
        f.write("\t{\n")
        f.write(f"\t\t\"{LABEL[0]}\": \"{row[0]}\",\n")
        f.write(f"\t\t\"{LABEL[1]}\": \"{row[1]}\",\n")
        f.write(f"\t\t\"{LABEL[2]}\": \"{row[2]}\",\n")
        f.write(f"\t\t\"{LABEL[3]}\": {row[3]},\n")
        f.write(f"\t\t\"{LABEL[4]}\": \"{row[4]}\",\n")
        f.write(f"\t\t\"{LABEL[5]}\": \"{row[5]}\"\n")
        if row != DATA[-1]:
            f.write("\t},\n")
        else:
            f.write("\t}\n")
    f.write("]\n")
    f.close()


if __name__ == "__main__":
    readfile()
    output()
