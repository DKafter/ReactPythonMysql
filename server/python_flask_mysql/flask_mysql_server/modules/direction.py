import os
import re;

class Direction(object):
    __dirNames: list;
    __path: str;
    __stringConcate: str = "";
    
    def __init__(self, dirNames: list, path: str = ""):
        self.__dirNames = dirNames;
        self.__path = path;
    
    def __str__(self):
        return self.__stringConcate();
    
    def getConcate(self) -> str:
        return self.__stringConcate;
    
    def direction(self) -> None:
        names = [];
        files = [];
        for list in self.__dirNames:
            names.append(os.path.join(os.getcwd(), self.__path, list));
            
        for name in names:
            for file in os.listdir(name):
                files.append(os.path.join(name, file));
                
        for fullname in files:
            get_filename = os.path.isfile(fullname);
            
            if get_filename:
                with open(fullname) as file:
                    self.__stringConcate += str(file.read());
                    
    def direction_from_file_str(self, filesEqual: list):
        names = [];
        files = [];
        for list in self.__dirNames:
            names.append(os.path.join(os.getcwd(), self.__path, list));
            
        for name in names:
            for file in os.listdir(name):
                for user_s in filesEqual:
                    match = re.findall(r"(" + user_s + "){1}", file, flags=re.MULTILINE);
                    print(match);
                    for i in match:
                        if i == file or i in file:
                            files.append(os.path.join(name, file));
                        
        for fullname in files:
            is_filename = os.path.isfile(fullname);
            print(fullname);
            if is_filename:
                with open(fullname) as file:
                    self.__stringConcate += str(file.read());
                    