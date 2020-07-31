require 'ruby2d'

set title: 'Ruby Test Console'
set background: 'purple'
# Set frame rate
set fps_cap: 25

# Set the window size
set width: 600, height: 720

t = Time.now
update do
  # Close the window after 3 seconds
  close if Time.now - t > 3
end

# Create a new shape
s = Square.new
# Give it some color
s.color = 'red'

Triangle.new(color: 'green', x: 175, y: 250, size: 30)

# Image.new('tetris/images/tetris-image.png')

# Text.new('Hello', color: 'green', x: 10, y: 10, size: 25) # prints text  to the screen. Accepts varriables

# p 'hello' # p to the console

arr = %w[hello there guys].join(' ')

Text.new(arr, color: 'black', x: 50, y: 25, size: 25)

Window.new('hello', color: 'white', width: 250, height: 200)
# tick = 0
#
# update do
#   set background: 'random' if tick % 60 == 0
#   tick += 1
# end

show
