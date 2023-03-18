import serial
import time
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import random


ser = serial.Serial('COM6', 9600)

list = []
l = []
counter = 0

plt.style.use('fivethirtyeight')

while ser.is_open and counter < 1000:
    line = ser.readline().decode().rstrip()
    print(line, counter)
    list.append(counter)
    l.append(line)
    
    counter = counter + 1

print(line)
# def animate(i):
#     x = list
#     y = l
#     plt.cla() # clear axis after plotting individual lines
#     plt.plot(x, y, label = 'XYZ') # selecting the x and y variables to plot
#     plt.xlabel('X') # label x axis
#     plt.ylabel('Y') # label y axis
#     plt.title('XYZ Graph')

# ani = FuncAnimation(plt.gcf(), animate, interval = 10, frames = 200, repeat = False)
# plt.tight_layout()
# plt.show()

# xlist = []
# ylist = []

# class RegrMagic(object):
#     """Mock for function Regr_magic()
#     """
#     def __init__(self):
#         self.x = 0
#         self.counter = 0
#     def __call__(self):
#         line = ser.readline().decode().rstrip()
#         self.x = int(line)
#         self.counter += 1
#         return self.x, self.counter

# regr_magic = RegrMagic()

# def frames():
#     while True:
#         yield regr_magic()

# fig = plt.figure()

# def animate(args):
#     xlist.append(args[1])
#     ylist.append(args[0])
#     return plt.plot(xlist, ylist, color='r')


# anim = FuncAnimation(fig, animate, frames=frames, interval=10)
# plt.show()