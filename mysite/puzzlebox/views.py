from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'puzzlebox/index.html')

def settings(request, user_id):
    return render(request, 'puzzlebox/settings.html')

def game(request, user_id):
    return render(request, 'puzzlebox/game.html')
