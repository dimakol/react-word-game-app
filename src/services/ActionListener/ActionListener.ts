class MyActionListener {
  private listeners: Map<string, Array<(data: string | null) => void>>;

  // Init the class
  constructor() {
    /**
     * Map to hold action names and their corresponding listeners
     * The key is the action name and the value is an array of functions (listeners)
     * that will be called when the action is emitted
     */
    this.listeners = new Map<string, Array<(data: string | null) => void>>();
  }

  /**
   * registerListener registers a function to an action name. In case the action already exists, the new listener should be added to the
   * already existing listeners
   * @param action - Action name
   * @param listener - Function to invoke upon action call
   */
  registerListener(
    action: string,
    listener: (data: string | null) => void
  ): void {
    if (!this.listeners.has(action)) {
      this.listeners.set(action, []);
    }
    this.listeners.get(action)?.push(listener);
  }

  /**
   * When calling the removeListener all listeners are removed from the action
   * and the action itself is removed and can no longer be called.
   * @param action - the Action to remove
   */
  removeListener(action: string): void {
    this.listeners.delete(action);
  }

  /**
   * Invoke all registered listeners of the giving action with the passed data
   * In case the action is not registered, an exception is thrown
   * @param action - The action name
   * @param data - The data to pass to all registered listeners as parameter
   */
  emit(action: string, data: string | null): void {
    const actionListeners = this.listeners.get(action);
    if (actionListeners) {
      actionListeners.forEach((listener) => {
        // use try-catch to handle any errors in the listener
        // This prevents one listener's error from stopping the execution of others
        try {
          listener(data);
        } catch (error) {
          console.error(`Error in listener for action "${action}":`, error);
        }
      });
    } else {
      throw new Error(`Can't emit an event. Event "${action}" doesn't exits.`);
    }
  }
}

export default MyActionListener;
