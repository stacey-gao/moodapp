import { Component, signal } from '@angular/core';
import { Greeting } from '../components/greeting/greeting';
import { Header } from "../components/header/header";
import { Logmood } from "../components/logmood/logmood";
import { Weeklytrend} from "../components/weeklytrend/weeklytrend";
import { MoodHistory } from "../components/mood-history/mood-history";

@Component({
  selector: 'app-dashboard',
  imports: [Greeting, Logmood, Weeklytrend, MoodHistory],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  homeMessage = signal("Welcome Back, User!"); //greeting

}
