import sys
import pickle
import pandas as pd

name = sys.argv[1]
brand = sys.argv[2]
ram = float(sys.argv[3])
storage_capacity = float(sys.argv[4])
camera_resolution = float(sys.argv[5])
operating_system = sys.argv[6]
screen_size = float(sys.argv[7])
condition = sys.argv[8]
color = sys.argv[9]

# print(name, brand, ram, storage_capacity, camera_resolution, operating_system, screen_size, condition, color)

with open('LinearRegressionModel.pkl', 'rb') as file:
    model = pickle.load(file)

pred = model.predict(pd.DataFrame([[name, brand, ram, storage_capacity, camera_resolution, operating_system, screen_size, condition, color]], columns= ['name', 'brand', 'ram', 'storage_capacity', 'camera_resolution', 'operating_system', 'screen_size', 'condition', 'color']))

print(str(pred))
sys.stdout.flush()