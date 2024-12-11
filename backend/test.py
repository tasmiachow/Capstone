import tensorflow as tf

try:
    # Replace 'path/to/model_1.h5' with the actual path to your model file
    model = tf.keras.models.load_model("C:/Users/tsmia/Downloads/tasmodel/backend/models/model_1.h5")
    print("Model loaded successfully.")
except Exception as e:
    print(f"Failed to load model: {e}")
