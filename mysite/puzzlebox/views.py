from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required
def index(request):
    return render(request, 'puzzlebox/index.html')

@login_required
def settings(request, user_id):
    return render(request, 'puzzlebox/settings.html')

@login_required
def game(request, user_id):
    return render(request, 'puzzlebox/game.html')

def login(rquest, user_id):
    return redirect()
