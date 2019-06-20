SOURCE := operatingsystems.md
TARGET := $(patsubst %.md,%.pdf,$(SOURCE))

all: $(TARGET)

$(TARGET): $(SOURCE)
	pandoc -t beamer $(SOURCE) -o $(TARGET)

preview: $(TARGET)
	zathura --fork $(TARGET)

watch:
	echo '$(SOURCE)' | entr -c make

clean:
	rm $(TARGET)
