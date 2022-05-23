import sys
import re, string
import numpy as np


f = open("shake.txt", "r")
data = f.read()
data = re.sub(r'[\n]', ' ', data)
data = re.sub(r'[^\w ]', '', data)
data = re.sub(r'[0-9]+', '', data)
translator = str.maketrans('', '', string.punctuation)
processed = np.array(data.translate(translator).lower().split())

# f=open("otherwords.txt", "r")
# data1 = f.readlines()
# data1 = re.sub(r'[\n]', ' ', data)
# data1 = re.sub(r'[^\w ]', '', data)
# data1 = re.sub(r'[0-9]+', '', data)
# translator = str.maketrans('', '', string.punctuation)
# processed1 = np.array(data1.translate(translator).lower().split())

# processed2 = np.concatenate((processed, processed1), axis = 0)
# print(data1[0:10])


# f = open("validwords.txt", "r")
# lines = f.readlines()
# lines = [line.rstrip() for line in lines]
processed = set(processed)
print(len(processed))
print(processed)
# lines = set(lines)
# print(lines)

# with open('validwords.txt', 'w') as f:
#     for line in lines:
#         f.write(line)
#         f.write('\n')