from django.db import models

# Create your models here.

class Game(models.Model):
    """
    Module for game table.
    """
    #default primary key: Game_id
    puzzle_image = models.ForeignKey(Image, on_delete=models.CASCADE)
    #ex: diff_level = 3 --> a 3*3 game board with 8 pieces of images
	difficulty_level = models.PositiveSmallIntegerField()
	create_time = models.DateTimeField(default=datetime.datetime.now)
    time_span_start = models.DateTimeField(blank=False)
    time_span_end = models.DateTimeField(blank=False)

class Image(models.Model):
    """
    Module for image table.
    """
    #default primary key: Image_id
    description = models.CharField(max_length=255, blank=True)
    image = models.FileField(upload to = 'images/')
    uploaded_time= models.DateTimeField(default=datetime.datetime.now)

class User_Game(models.Model):
    """
    Module for user_game table.
    """
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True)

    class Meta:
        unique_together = ("game", "user")
