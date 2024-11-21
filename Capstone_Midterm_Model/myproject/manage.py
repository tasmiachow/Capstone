#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

# Load the model at the module level
model = joblib.load('Capstone\Capstone\Capstone_Midterm_Model\Hello,Bye,Thank_you\model.h5')# change to the path of your model

def predict(input_data):
    # Make predictions using the loaded model
    return model.predict(input_data)
    
    
def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)
    
    predict()



if __name__ == '__main__':
    main()
    
    

